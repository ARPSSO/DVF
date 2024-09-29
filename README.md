
<br />
<div align="center">
  <h3 align="center">DVF-js</h3>

  <p align="center">
    A trusted third-party script responsible for RP verification through the browser's front channel in ARPSSO. 
    <br />
    <a href="https://arpsso.hejunlin.cn"><strong>View ARPSSO Demo »</strong></a>
  </p>
</div>

This repository contains an implementation of RP verification, an integral part of the Data Verify Forwarder (DVF). The scripts housed here are packaged using `webpack` to ensure optimal transmission over the web. The comprehensive DVF source code is available [here](https://github.com/ARPSSO/arpsso.github.io) and deployed on [arpsso.github.io](https://arpsso.github.io). All code related to the DVF is openly available for public inspection and review to ensure its trustworthiness.

<!-- GETTING STARTED -->
## Getting Started

This is an example of how to pack the scripts into a single file.

### Prerequisites

Here are the prerequisites installed in your environment:

- Node.js
- npm

### Installation
Follow the steps below to pack the scripts into a single file:

1. Clone this repository.
    ```sh
    git clone git@github.com:ARPSSO/DVF.git
    ```
2. Run the following command to pack the scripts.
    ```sh
    npm run-script build
    ```
3. You will find a script file in `./dist/dvf.xxxxx.js`. The `xxxxx` is the first five digits of the script's hash. You can compare this file with the script in [arpsso.github.io](https://arpsso.github.io).
