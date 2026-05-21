terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
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
      "Content-Type",
      "ETag"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_object" "madworld-extras" {
  for_each    = fileset("../public/extras/", "**")
  acl         = "public-read"
  bucket      = aws_s3_bucket.madworld.id
  key         = "extras/${each.value}"
  source      = "../public/extras/${each.value}"
  source_hash = filemd5("../public/extras/${each.value}")
  depends_on  = [aws_s3_bucket_ownership_controls.madworld, aws_s3_bucket_public_access_block.madworld]
}

resource "aws_s3_object" "madworld-samples" {
  for_each    = fileset("../public/samples/", "**")
  acl         = "public-read"
  bucket      = aws_s3_bucket.madworld.id
  key         = "samples/${each.value}"
  source      = "../public/samples/${each.value}"
  source_hash = filemd5("../public/samples/${each.value}")
  depends_on  = [aws_s3_bucket_ownership_controls.madworld, aws_s3_bucket_public_access_block.madworld]
}

resource "aws_s3_object" "madworld-tracks" {
  for_each    = fileset("../public/tracks/", "**")
  acl         = "public-read"
  bucket      = aws_s3_bucket.madworld.id
  key         = "tracks/${each.value}"
  source      = "../public/tracks/${each.value}"
  source_hash = filemd5("../public/tracks/${each.value}")
  depends_on  = [aws_s3_bucket_ownership_controls.madworld, aws_s3_bucket_public_access_block.madworld]
}

resource "aws_s3_object" "madworld-videos" {
  for_each    = fileset("../public/videos/", "**")
  acl         = "public-read"
  bucket      = aws_s3_bucket.madworld.id
  key         = "videos/${each.value}"
  source      = "../public/videos/${each.value}"
  source_hash = filemd5("../public/videos/${each.value}")
  depends_on  = [aws_s3_bucket_ownership_controls.madworld, aws_s3_bucket_public_access_block.madworld]
}
