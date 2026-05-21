variable "allowed_origins" {
  default = ["http://madworld.local", "https://mad-world.vercel.app"]
  type    = list(any)
}

variable "bucket" {
  type = string
}

variable "region" {
  default = "eu-west-1"
  type    = string
}
