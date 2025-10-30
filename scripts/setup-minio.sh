#!/bin/bash

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
sleep 5

# Configure MinIO client
mc alias set myminio http://minio:9000 minioadmin minioadmin123

# Create the images bucket if it doesn't exist
mc mb myminio/images --ignore-existing

# Set public policy for the bucket (or use a custom policy)
mc anonymous set download myminio/images

echo "MinIO setup complete! Bucket 'images' is ready."
