# Use the official Go image as a base
FROM golang:1.23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Go module files
COPY go.* ./

# Install dependencies
RUN go mod download

# Copy the Go source code
COPY . .

# Build the Go application
RUN go build -o main main.go

EXPOSE 8080

CMD [ "./main" ]