# Flex

A responsive and modular front-end framework closely following the [SMACSS](http://smacs.com) naming conventions and concepts.

To get started, checkout http://flex.fyvesmedia.com

## Installing Gem

Add the following line in your gemfile:

```ruby
gem "flex", :group => :assets
```

Alternatively you can install from the latest build:

```ruby
gem "flex", :git => 'git://github.com/suciuvlad/flex-rails.git', :group => :assets
```

Then run `bundle install` to install the gem.

## How to use
Require flex in your manifest files like so:

### The CSS
`application.css`

```css
/*
 *= require flex
 */
```

### The Javascript
`application.js`

```js
/*
 *= require flex
 */
```

## Advanced

If your project only needs a couple of the flex functionalities you can select them by manually including the css and javascript you need.

Keep in mind that some of the files are required(i.e. settings, mixins, functions, etc) for the framework to work.

```css
/*
 *= require flex/settings
 *= require flex/functions
 *= require flex/mixins
 *= require flex/base
 *= require flex/states

 *= require flex/form
 *= require flex/form-compose
 *= require flex/form-message

 ...
 */
```

```js
/*
 *= require flex/polyfills

 *= require flex/dropdown
 *= require flex/message

 ...
 */
```

### Here's the full list:

#### CSS
<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Code</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2">REQUIRED</td>
  </tr>

  <tr>
    <td>Reset</td>
    <td>css *= require flex/reset</td>
  </tr>

  <tr>
    <td>Settings</td>
    <td>css *= require flex/settings</td>
  </tr>

  <tr>
    <td>Functions</td>
    <td>css *= require flex/functions</td>
  </tr>

  <tr>
    <td>Mixins</td>
    <td>css *= require flex/mixins</td>
  </tr>

  <tr>
    <td>Base</td>
    <td>css *= require flex/base</td>
  </tr>

  <tr>
    <td>States</td>
    <td>css *= require flex/states</td>
  </tr>

  <tr>
    <td colspan="2">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="2">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="2">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="2">OPTIONAL</td>
  </tr>

  <tr>
    <td>Form</td>
    <td>css *= require flex/form</td>
  </tr>

  <tr>
    <td>Form - Extension *</td>
    <td>css *= require flex/modules/form-compose</td>
  </tr>

  <tr>
    <td>Message</td>
    <td>css *= require flex/modules/message</td>
  </tr>

  <tr>
    <td>Message - Extension *</td>
    <td>css *= require flex/modules/message-compose</td>
  </tr>

  <tr>
    <td>Label</td>
    <td>css *= require flex/modules/label</td>
  </tr>

  <tr>
    <td>Label - Extension *</td>
    <td>css *= require flex/modules/label-compose</td>
  </tr>

  <tr>
    <td>Button</td>
    <td>css *= require flex/modules/button</td>
  </tr>

  <tr>
    <td>Button - Extension *</td>
    <td>css *= require flex/modules/button-compose</td>
  </tr>

  <tr>
    <td>Toolbar</td>
    <td>css *= require flex/modules/button</td>
  </tr>

  <tr>
    <td>Toolbar - Extension *</td>
    <td>css *= require flex/modules/toolbar-compose</td>
  </tr>

  <tr>
    <td>Table</td>
    <td>css *= require flex/modules/table</td>
  </tr>

  <tr>
    <td>Table - Extension *</td>
    <td>css *= require flex/modules/table-compose</td>
  </tr>

  <tr>
    <td>Tooltip</td>
    <td>css *= require flex/modules/tooltip</td>
  </tr>

  <tr>
    <td>Tooltip - Extension *</td>
    <td>css *= require flex/modules/tooltip-compose</td>
  </tr>

  <tr>
    <td>Bubble</td>
    <td>css *= require flex/modules/tooltip</td>
  </tr>

  <tr>
    <td>Bubble - Extension *</td>
    <td>css *= require flex/modules/bubble-compose</td>
  </tr>

  <tr>
    <td>Subnav</td>
    <td>css *= require flex/modules/tooltip</td>
  </tr>

  <tr>
    <td>Subnav - Extension *</td>
    <td>css *= require flex/modules/subnav-compose</td>
  </tr>

  <tr>
    <td>Dropdown</td>
    <td>css *= require flex/modules/dropdown</td>
  </tr>

  <tr>
    <td>Dropdown - Extension *</td>
    <td>css *= require flex/modules/dropdown-compose</td>
  </tr>

  <tr>
    <td>Modal</td>
    <td>css *= require flex/modules/modal</td>
  </tr>

  <tr>
    <td>Modal - Extension *</td>
    <td>css *= require flex/modules/modal-compose</td>
  </tr>

  <tr>
    <td>Close **</td>
    <td>css *= require flex/modules/close</td>
  </tr>

  <tr>
    <td>Pagination</td>
    <td>css *= require flex/pagination</td>
  </tr>

  <tr>
    <td>Pagination - Extension *</td>
    <td>css *= require flex/pagination-compose</td>
  </tr>

  <tr>
    <td>Misc</td>
    <td>css *= require layout/misc</td>
  </tr>

  <tr>
    <td>Grid</td>
    <td>css *= require layout/grid</td>
  </tr>

  <tr>
    <td>Responsive (grid)</td>
    <td>css *= require layout/responsive</td>
  </tr>

</tbody>
</table>

 ``*`` Extensions usually include additional functionalities like rounded corners, zebra striped tables, etc

 ``**`` Required by the **Modal** module
###### Some of the modules rely on javascript to work

#### Javascript

<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Polyfills *</td>
      <td>css *= require flex/polyfills</td>
    </tr>

    <tr>
      <td>Tooltip</td>
      <td>css *= require flex/jquery.tooltip.js</td>
    </tr>

    <tr>
      <td>Bubble</td>
      <td>css *= require flex/jquery.bubble.js</td>
    </tr>

    <tr>
      <td>Dropdown</td>
      <td>css *= require flex/jquery.dropdown.js</td>
    </tr>

    <tr>
      <td>Message</td>
      <td>css *= require flex/jquery.message.js</td>
    </tr>

    <tr>
      <td>Modal</td>
      <td>css *= require flex/jquery.modal.js</td>
    </tr>

    <tr>
      <td>Tab</td>
      <td>css *= require flex/jquery.tab.js</td>
    </tr>
  </tbody>
</table>

``*`` ECMA5 Polyfills

Copyright and license
------------------------------
MIT Open Source License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.