![MadWorld](./public/images/madworld-logo.png)

<p align="center">NSFW Sega MadWorld Audio Player</p>

<hr/>

> <i>"Greetings, gore sport fans! It's a beautiful evening on Jefferson Island, just perfect weather for our unwilling contestants to compete in the Varrigan City DeathWatch. My name is Howard "Buckshot" Holmes, and along with my co-commentator Kreese Kreely, I'll be giving you a slay-by-slay account of tonight's bloodbath. With access to the more than ten thousand cameras in this city, you can be sure not to miss a single disembowelment or brutal ass-shanking."</i> — Howard "Buckshot" Holmes

This not-safe-for-work application is a tribute to one of my favourite games - [Madworld](https://www.platinumgames.com/games/madworld) by [Platinum Games](https://www.platinumgames.com/) where you get to experience a unique blend of brutality, humor and madness in a graphic novel-style world that’s black and white and blood-red all over.

In a blatant act of copyright infringement, this application plays randomised tracks from the MadWorld OST and lets you trigger samples of the hilarious in-game commentary from Howard "Buckshot" Holmes (Greg Proops) & Kreese Kreely (John DiMaggio) while displaying a selection of gory screen shots in the background - and if you leave it idle for 30 seconds, it'll remind you it's still there...

## Install Package Dependencies

```
pnpm install
```

## Development Build

```
pnpm dev
```

## Production Build

```
pnpm build
pnpm start
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

## Docker

```
docker build -t madworld .
docker run -p 3000:3000 \
  -e AWS_ACCESS_KEY_ID="..." \
  -e AWS_BUCKET="..." \
  -e AWS_REGION="..." \
  -e AWS_SECRET_ACCESS_KEY="..." \
  madworld
```

The image uses `node:22-slim` and Next.js standalone output. Audio/video assets are served from S3 at runtime — they are not baked into the image.

## Commits & releases

This repo follows [Conventional Commits](https://www.conventionalcommits.org/) and uses [semantic-release](https://semantic-release.gitbook.io/) to publish versions automatically.

- Run `pnpm commit` for an interactive prompt (commitizen), or write the message by hand.
- A husky `commit-msg` hook runs commitlint and rejects non-conventional messages.
- Pushes to `main` trigger [`.github/workflows/release.yml`](.github/workflows/release.yml), which decides the next version from the commits, updates `CHANGELOG.md` and `package.json`, tags the commit, and publishes a GitHub Release.

| Commit type                                              | Effect             |
| -------------------------------------------------------- | ------------------ |
| `feat: …`                                                | Minor version bump |
| `fix: …`                                                 | Patch version bump |
| `…\!: …` or `BREAKING CHANGE:` footer                    | Major version bump |
| `chore:`, `docs:`, `ci:`, `refactor:`, `test:`, `style:` | No release         |
