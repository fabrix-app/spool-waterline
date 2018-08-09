# spool-waterline

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

Loads Application Models (in `api/models`) into the Waterline ORM; Integrates with [spool-router](https://github.com/fabrix-app/spool-router) to
generate Tapestries for routes.

## Usage

### Configure

```js
// config/main.ts
import { WaterlineSpool } from '@fabrix/spool-waterline'
export const main = {
  // ...
  spools: [
    // ...other spools
    WaterlineSpool
  ]
}
```

### Query

```js
// api/services/BirthdayService.ts
export class BirthdayService extends Service {
  /**
   * Finds people with the given birthday.
   * @return Promise
   * @example {
   *    name: 'Ludwig Beethoven',
   *    birthday: Sun Dec 16 1770 00:00:00 GMT-0500 (EST),
   *    favoriteColors: [
   *      { name: 'yellow', hex: 'ffff00' },
   *      { name: 'black', hex: '000000' }
   *     ]
   * }
   */
  findPeopleWithBirthday (birthday) {
    return this.orm.Person.find({ birthday: birthday })
      .populate('favoriteColors')
  }
}
```

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/fabrix-app/fabrix/blob/master/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.


## License
[MIT](https://github.com/fabrix-app/spool-waterline/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-waterline.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-waterline
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-waterline/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-waterline/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-waterline.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-waterline
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-waterline.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-waterline/coverage
