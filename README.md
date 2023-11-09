![MadWorld](/public/images/madworld-logo.png)

<p align="center">NSFW Sega MadWorld Audio Player</p>

<hr/>

> <i>"Greetings, gore sport fans! It's a beautiful evening on Jefferson Island, just perfect weather for our unwilling contestants to compete in the Varrigan City DeathWatch. My name is Howard "Buckshot" Holmes, and along with my co-commentator Kreese Kreely, I'll be giving you a slay-by-slay account of tonight's bloodbath. With access to the more than ten thousand cameras in this city, you can be sure not to miss a single disembowelment or brutal ass-shanking."</i>
> — Howard "Buckshot" Holmes

This not-safe-for-work application is a tribute to one of my favourite games - [Madworld](https://www.platinumgames.com/games/madworld) by [Platinum Games](https://www.platinumgames.com/) where you get to experience a unique blend of brutality, humor and madness in a graphic novel-style world that’s black and white and blood-red all over.

In a blatant act of copyright infringement, this application plays randomised tracks from the MadWorld OST and lets you to trigger samples of the hilarious in-game commentary from Howard "Buckshot" Homes (Greg Proops) & Kreese Kreely (John DiMaggio) while displaying a selection of gory screen shots in the background.

## Install Package Dependencies

```
npm install
```

## Development Build

```
npm run dev
```

## Production Build

```
npm run build
npm start
```

### AWS Configuration

In development mode the application uses local audio resources, however in production mode audio resources are retrieved from the AWS Simple Storage Service (S3).

To deploy the audio resources to AWS with [terraform](https://developer.hashicorp.com/terraform) create a `terraform.tfvars` file in the `terraform` folder providing a list of allowed origins for CORS and a unique bucket name:

```
allowed_origins = [ "*" ]
bucket = "..."
```

Now from with the terraform directory provision your infrastructure with:

```
terraform init
terraform apply
```

Finally, configure your application by declaring the following variables in your deployment environment:

```
AWS_ACCESS_KEY_ID = "..."
AWS_BUCKET = "..."
AWS_REGION = "..."
AWS_SECRET_ACCESS_KEY = "..."
```
