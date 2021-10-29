#!/bin/bash

network='gameCheckpoint';
cServer='gameCheckExpress';
cClient='gameCheckAngular';
cDB='gameCheckMongoDB';

checkContainer(){
    docker=0;
    
    if [ `docker ps -a -f name=$cServer` -gt 0 ];then
        docker+=1;
    fi
    
    if [ `docker ps -a -f name=$cClient` -gt 0 ];then
        docker+=2;
    fi
    echo $docker;
}

db(){
    if [ `docker ps -a -f name=$cDB` -eq 0 ];then
        docker build -t $cDB -f ./docker/dockerfile-db;
        docker run --name=$cDB -v gameCheckVol:/data/db --network=$network -p 27017:27017 -d $cDB
    else
        docker start $cDB;
    fi
}

server(){
    if [ $cExist -eq 1 || $cExist -eq 3 ];then
        docker start $cServer;
    else
        docker build -t $cServer -f ./docker/dockerfile-server;
        docker run --name=$cServer -v ./backend:/project --network=$network -p 4000:4000 -d $cServer
    fi
}

client(){
    if [ $cExist -eq 2 || $cExist -eq 3 ];then
        docker start $cClient;
    else
        docker build -t $cClient -f ./docker/dockerfile-client;
        docker run --name=$cClient -v ./frontend:/project --network=$network -p 80:4200 -d $cClient
    fi
}

cExist=`checkContainer`;
docker network create $network;
cp ./docker/config.env ./backend/config/

db;
server;
client;



