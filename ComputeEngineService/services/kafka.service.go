package service

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	// "../handlers"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
)

var P *kafka.Producer
var Topic string

func KafkaInit() {
	broker := Broker
	group := GroupId
	topics := []string{"computeengine_execute_req"}
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers":     broker,
		"broker.address.family": "v4",
		"group.id":              group,
		"session.timeout.ms":    6000,
		"auto.offset.reset":     "earliest"})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create consumer: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("Created Consumer %v\n", c)

	err = c.SubscribeTopics(topics, nil)

	topic := "computeengine_execute_res"
	Topic = topic
	// P, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": broker})
	// if err != nil {
	// 	fmt.Printf("Failed to create producer: %s\n", err)
	// 	os.Exit(1)
	// }

	// fmt.Printf("Created Producer %v\n", P)

	run := true

	for run == true {
		select {
		case sig := <-sigchan:
			fmt.Printf("Caught signal %v: terminating\n", sig)
			run = false
		default:
			ev := c.Poll(100)
			if ev == nil {
				continue
			}

			switch e := ev.(type) {
			case *kafka.Message:
				fmt.Println(string(e.Key))
				fmt.Println(*e.TopicPartition.Topic)
				fmt.Println(string(e.Value))
				//unmarshal the json and execute it then product the response back to kafka
				//execute code and produce event
				// produce(string(e.Value), string(e.Key))
				// handler.Ex
				if topic != "nil" {

				}
				if e.Headers != nil {
					fmt.Printf("%% Headers: %v\n", e.Headers)
				}
			case kafka.Error:
				fmt.Fprintf(os.Stderr, "%% Error: %v: %v\n", e.Code(), e)
				if e.Code() == kafka.ErrAllBrokersDown {
					run = false
				}
			default:
				fmt.Printf("Ignored %v\n", e)
			}
		}
	}

	fmt.Printf("Closing consumer\n")
	c.Close()
}
func Produce(value string, key string) {
	deliveryChan := make(chan kafka.Event)
	err := P.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &Topic, Partition: kafka.PartitionAny},
		Value:          []byte(value),
		Key:            []byte(key),
	}, deliveryChan)
	if err == nil {
	}
	e2 := <-deliveryChan
	m := e2.(*kafka.Message)
	if m.TopicPartition.Error != nil {
		fmt.Printf("Delivery failed: %v\n", m.TopicPartition.Error)
	} else {
		fmt.Printf("Delivered message to topic %s [%d] at offset %v\n",
			*m.TopicPartition.Topic, m.TopicPartition.Partition, m.TopicPartition.Offset)
	}
	// p.Close()
	close(deliveryChan)
}

func execute(ret string, key string) string {
	// produce(ret, key, p, "")
	return ret
}
