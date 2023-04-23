FROM golang:alpine3.17 as builder
WORKDIR /app
COPY . . 
RUN go build -o main .

FROM scratch
WORKDIR /app
COPY --from=builder /app .
CMD [ "/app/main" ]


