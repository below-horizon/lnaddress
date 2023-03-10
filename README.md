# lnaddress
Serves single or multiple LNAddresses from own domain.

## Prerequisite

- LNURL (Alby, LightningTipBot, LNbits...)
- Domain
- Nodejs

## Installation
```
git clone https://github.com/below-horizon/lnaddress
cd lnaddress && npm install
npm run start
```
## Usage

Copy config.example.json to config.json.

Edit config.json file and input your own username, bech32LNURL (LNURL...) and port you wish to use.

Example file has 3 users, you can have as many or few as you like.

You should be able to access to `https://YOURDOMAIN.COM/.well-known/lnurlp/USERNAME` and get a [LUD-06](https://github.com/lnurl/luds/blob/luds/06.md) JSON response.

## Docker
```
Edit config.json before running docker compose
docker compose up -d
OR
docker-compose up -d
```

## Reverse proxy

### Nginx
```
location /.well-known/lnurlp {
  add_header Access-Control-Allow-Origin *;
  add_header Content-Type application/json;
  proxy_set_header Host $http_host;
  proxy_pass http://127.0.0.1:<PORT-FROM-CONFIG>;
}
```

## Systemd service example
```
# /etc/systemd/system/lnaddress.service

[Unit]
Description=lnaddress
After=network.target

[Service]
WorkingDirectory=/home/<USER>/lnaddress
ExecStart=/usr/bin/npm run start
User=<USER>
Restart=always
TimeoutSec=120
RestartSec=30
StandardOutput=null
StandardError=journal

[Install]
WantedBy=multi-user.target
```

## Support
You can support by donating to my Lightning address `below_horizon@happysats.org`