variable "allowed_origins" {
  default = ["*"]
  type    = list(any)
}

variable "bucket" {
  type = string
}
