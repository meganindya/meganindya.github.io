# Building Music Blocks (v4)

I am currently leading the effort at a foundational rebuild of an open-source project called
**Music Blocks**, which is maintained by an open-source organisation name **Sugar Labs**. The aim of
the new project is to address some of the major shortcomings of the original application (currently
in v3), upgrade to _modern web technologies_, and develop a _dynamically pluggable_ &
_modular architecture_.

## About Music Blocks

**Music Blocks** is a _Visual Programming Platform_ and collection of manipulative tools for exploring
musical and mathematical concepts in an integrative and fun way, with the aim to engage children in
arts, music, and computation.

[Application](https://musicblocks.sugarlabs.org) | [Repository](https://github.com/sugarlabs/musicblocks)

![Music Blocks - 1](https://cdn.jsdelivr.net/gh/sugarlabs/musicblocks/screenshots/Screenshot-1.png)

![Music Blocks - 2](https://cdn.jsdelivr.net/gh/sugarlabs/musicblocks/screenshots/Screenshot-2.png)

## Google Summer of Code 2020

### Project

I joined this project in **March 2020** and made some critical bug fixes and minor UI improvements.
Thereafter, I applied for a summer-long project for **Google Summer of Code (GSoC) 2020** to work with
**Sugar Labs** on this application, and was selected.

My GSoC project was titled **"Music Blocks JavaScript Export"**. As seen in the screenshots above,
**Music Blocks** programs were originally meant to built using interactive GUI blocks. My proposal
was based on the prospective project idea of building a _JavaScript_ counterpart to building the said
programs, as a way to assist users migrate to more expressive, conventional programming languages.

### Description

I started by refactoring the codebase to separate the functionality, state-management, and the UI
from each other; in essence I refactored the code base to implement a hierarchical
**Model-View-Controller (MVC)** pattern.

Thereafter, I went on the build the framework for executing **Music Blocks** projects independently
of the UI. In the process, I built an _API_ library containing the invoke signatures for each
**Music Blocks** 'block'. At this point, **Music Blocks** programs could be authored in _JavaScript_
and executed.

After the refactoring was complete, I built the framework to build **Music Blocks** programs using
the UI elements and then generating analogous _JavaScript_ code for them. During this process, I
worked on _JavaScript's_ **Abstract Syntax Trees** (**ECMAScript2017 ESTree** spec). I built a
3-dimensional tree-like data-structure from the UI program, and then converted each individual unit
to a corresponding **ESTree** node. I generated the entire _AST_ recursively, and finally, used
it to synthesize _JavaScript_ code for **Music Blocks** programs.

To wrap up, I built a GUI code editor exposing all the implemented functionality.

I made **240 commits** over **51 pull requests** during the development of the project. The detailed
report of the project's development can be found [here](https://github.com/meganindya/gsoc-musicblocks-js-export).

![MB-JS-Export](https://cdn.jsdelivr.net/gh/meganindya/gsoc-musicblocks-js-export/assets/js-editor.png)

## Admin and Maintainer (after GSoC)

### Initiative

After the completion of my project, I decided to remain involved with the project and was made a
maintainer. The version of **Music Blocks**, I originally worked on, has some critical issues. Since
**Music Blocks** is a fork of [**Turtle Blocks JS**](https://turtle.sugarlabs.org/) (a
[**Logo**](https://en.wikipedia.org/wiki/Logo_(programming_language))-like program), musical
functionality was added on top of it. However, music is fundamental to **Music Blocks**. Besides,
**Turtle Blocks JS** started initially with handful of features and was build without a complex
architecture. As **Music Blocks** got built on top of that, it got incrementally complex, but the
architecture remained simple, thus resulting in a monolith. Also, the functionality is tightly coupled
with the interface and native client API (_Web API_).

Keeping these problems in mind, I took the initiative to propose a foundational rebuild to address
all these issues, whilst adding buffers for future additions. The aim is also to use a more elegant
tech-stack to develop and maintain this project given its scale.

### Progress on Music Blocks (v4)

[Preview](https://sugarlabs.github.io/musicblocks-v4) | [Repository](https://github.com/sugarlabs/musicblocks-v4)

I am currently leading the effort in rebuilding **Music Blocks**. Some insights into the new application
are as follows:

- The application is intended to primarily be a _TypeScript_ app. The idea is that any UI framework
can be independently used to synthesize the UI of a component, without aligning the project to a
specific framework.

- The project is intended to be absolutely modular at the component-unit level. Every component should
be able to be loaded _dynamically_. Other features like _Internationalisation (i18n)_ should load
their resources dynamically too. This is intended for two reasons:

  - Very fast startup time
  - The ability to configure application to load specific components (and modify that dynamically as
well)

- The tech stack used include: _TypeScript 4_, _React 17_, _SCSS 3_, _p5.js_, _tone.js_, _Webpack 5_,
_Jest_, _Cypress_, and _Docker_.

#### Architecture (application)

![MB-v4-1](https://cdn.jsdelivr.net/gh/sugarlabs/musicblocks-v4/docs/images/architecture/components.png)

#### Architecture (programming engine)

![MB-v4-2](https://cdn.jsdelivr.net/gh/sugarlabs/musicblocks-v4-lib/docs/images/architecture.jpg)

#### Wireframe

![MB-v4-1](https://cdn.jsdelivr.net/gh/sugarlabs/musicblocks-v4/docs/images/wireframe.jpg)

#### Screenshot

![MB-v4-1](/assets/highlight/screenshot.png)

### GSoC 2021, 2022

I mentored a total of 7 **GSoC** projects during the 2021 and 2022 programmes. During **GSoC 2021**,
the students built prototypes for some of the foundational UI components. A prototype of the GUI
program builder was made. During **GSoC 2022**, the students worked on a custom code editor, a media
import-export framework, and migrating from _create-react-app_ configurations to explicit _Webpack 5_
configurations.
