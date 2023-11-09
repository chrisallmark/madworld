terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "madworld" {
  bucket = var.bucket
}

resource "aws_s3_bucket_acl" "madworld" {
  bucket     = aws_s3_bucket.madworld.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.madworld]
}

resource "aws_s3_bucket_ownership_controls" "madworld" {
  bucket = aws_s3_bucket.madworld.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_public_access_block" "madworld" {
  bucket              = aws_s3_bucket.madworld.id
  block_public_acls   = false
  block_public_policy = false
}

resource "aws_s3_bucket_cors_configuration" "madworld" {
  bucket = aws_s3_bucket.madworld.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = var.allowed_origins
    expose_headers = [
      "Content-Length",
      "Content-Typeid",
      "ETag"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_object" "madworld-extras" {
  for_each    = fileset("../public/extras/", "**")
  acl         = "public-read"
  bucket      = var.bucket
  key         = "extras/${each.value}"
  source      = "../public/extras/${each.value}"
  source_hash = filemd5("../public/extras/${each.value}")
}

resource "aws_s3_object" "madworld-samples" {
  for_each    = fileset("../public/samples/", "**")
  acl         = "public-read"
  bucket      = var.bucket
  key         = "samples/${each.value}"
  source      = "../public/samples/${each.value}"
  source_hash = filemd5("../public/samples/${each.value}")
}

resource "aws_s3_object" "madworld-tracks" {
  for_each    = fileset("../public/tracks/", "**")
  acl         = "public-read"
  bucket      = var.bucket
  key         = "tracks/${each.value}"
  source      = "../public/tracks/${each.value}"
  source_hash = filemd5("../public/tracks/${each.value}")
}
