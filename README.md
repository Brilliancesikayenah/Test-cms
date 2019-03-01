# wi83-kodebase-a
Basal kodebase til begynderprojekter med nodejs, express og myql2

[Changelog](CHANGELOG.md) | [Licens](LICENSE)

## Installation
`$ npm install`

## Kør
For udvikling, brug

`$ npm run dev`

For produktion, brug

`$ npm start`

## .env
Følsomme variabler, som for eksempel database adgangskoder eller API nøgler bør aldrig indgå direkte i din kode. Derfor gemmer vi disse variabler i en `.env` fil.

Denne fil bliver ignoreret af Git og du kan derfor have forskellige .env variabler på din udvikler-maskine og på din server.

Eftersom .env bliver ignoreret af Git, skal du selv oprette denne fil. Den skal ligge i projektets rod.

Brug følgende eksempel i din .env fil

```
DB_USER=root
DB_PSWD=root
DB_HOST=localhost
DB_DTBS=kodebase

PORT=1337
SITE_HOST=localhost

SESSION_SECRET=blowfishsecret
```

## Debug
Brug `debug()` i stedet for `console.log()`.

Du kender det: Du ved ikke lige hvad der er galt med din kode, så du tester et par outputs vha. `console.log()`. Når du er færdig med at teste, sletter du linien igen. Men et par minutter senere har du brug for at teste igen, og du er nødt til at skrive hele linien en gang til.

Med `debug()` kan du undlade at slette dine debug-linier, men i stedet slå debug til og fra i hele eller dele af din kode. På denne måde kan du køre dit script i "debug mode" hvor alle dine debug linier bliver skrevet ud i konsollen, eller i "produktions mode" hvor ingen af dine debug linier bliver skrevet ud.

I `package.json` er der et startup script til win32 og et til linux/os. Hvis du bruger windows skal du muligvis ændre dette startup script en lille smule, afhængig af om du bruger CMD eller PowerShell. Spørg din lærer.