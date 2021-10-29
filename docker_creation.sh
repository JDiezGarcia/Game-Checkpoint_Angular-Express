#!/bin/bash

network='game-check-point';
cServer='game-check-express';
cClient='game-check-angular';
cDB='gamecheckmongodb';
path=`pwd`;

checkContainer(){
    docker=0;
    
    if  [ `docker ps -a -f name=$cServer | wc -l` -gt 1 ] ;then
        docker=$(($docker + 1));
    fi
    
    if  [ `docker ps -a -f name=$cClient | wc -l` -gt 1 ] ;then
        docker=$(($docker + 2));
    fi
    echo $docker;
}

db(){
    if [ `docker ps -a -f name=$cDB | wc -l ` -eq 1 ] ;then
        docker build -t $cDB -f docker/dockerfile-db docker;
        docker run --name=$cDB -v gameCheckVol:/data/db --network=$network -p 27017:27017 -d $cDB:latest;
    else
        docker start $cDB > /dev/null &2>&1;
    fi
}

server(){
    if [ $cExist -eq 1 ] || [ $cExist -eq 3 ];then
        docker stop $cServer > /dev/null &2>&1;
        docker start $cServer > /dev/null &2>&1;
    else
        docker build -t $cServer -f docker/dockerfile-server docker;
        docker run --name=$cServer -v ${path}/backend:/project --network=$network -p 4000:4000 -d $cServer:latest;
    fi
}

client(){
    if [ $cExist -eq 2 ] || [ $cExist -eq 3 ];then
        docker stop $cClient > /dev/null &2>&1;
        docker start $cClient > /dev/null &2>&1;
    else
        docker build -t $cClient -f docker/dockerfile-client docker;
        docker run --name=$cClient -v ${path}/frontend:/project --network=$network -p 80:4200 -d $cClient:latest;
    fi
}

cExist=`checkContainer`;
docker network create $network > /dev/null &2>&1;
cp ./docker/config.env ./backend/config/;

db;
server;
client;
docker exec gamecheckmongodb mongorestore --db game-checkpoint --drop .;



