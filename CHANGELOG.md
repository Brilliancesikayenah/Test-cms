# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.4] - 2018-10-23
### Changed
- Changed how session secret loads, now with fallback

## [0.4.3] - 2018-10-23
### Added
- Run script support for MacOS (darwin)

## [0.4.2] - 2018-10-23
### Changed
- Proper favicon

## [0.4.1] - 2018-10-23
### Changed
- Moved session secret to .env file

## [0.4.0] - 2018-10-23
### Changed
- Error pages changed to not include the specific error. Error logs have been moved to the console.

### Removed
- spdy and SSL certificates due to unstable page refresh causing server to crash

## [0.3.1] - 2018-08-13
## Changed
- Mysql2 con nection changed to mysql-pool, because conection temination is automatic with mysql

## [0.3.0] - 2018-08-07
## Added
- Debug library for dev mode debug toggling
- run-script-os library for OS specific npm scripts
- favicon to shut up the console error log

## Removed
- Views for errorpages 404 and 500. Why? Because they are essentially the same as the view for page

## Changed
- Page view now includes content as well as heading level 1 (title)
- Example routes now include content
- OS specific startup scripts (win32 and linux)
- Readme file updated with debug info, .env instructions, and startup script instructions

## [0.2.0] - 2018-07-24
### Added
- Support for .env configuration
- environmental variables file for dev: `.env`

### Changed
- NPM dev script changed to utilize dotenv
- Database configuration now uses dotenv variables
- Port is now set through dotenv variables

## [0.1.1] - 2018-07-03
### Chnaged
- Corrected a typo in the classname of siteHeader

## [0.1.0] - 2018-06-26
### Added
- Basic folder structure
- Packages
- Fonts
- CSS
- cssLoader, a JS function for deferred loading of stylesheets
- Express server logic with ll intended libraries imported and a few basic routes defined
- This changelog