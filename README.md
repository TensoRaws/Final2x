# Final2x

![MacOS](https://img.shields.io/badge/Support-MacOS-blue?logo=Apple&style=flat-square)
![Windows](https://img.shields.io/badge/Support-Windows-blue?logo=Windows&style=flat-square)
![Linux](https://img.shields.io/badge/Support-Linux-blue?logo=Linux&style=flat-square)
[![CI-test](https://github.com/TensoRaws/Final2x/actions/workflows/CI-test.yml/badge.svg)](https://github.com/TensoRaws/Final2x/actions/workflows/CI-test.yml)
[![CI-build](https://github.com/TensoRaws/Final2x/actions/workflows/CI-build.yml/badge.svg)](https://github.com/TensoRaws/Final2x/actions/workflows/CI-build.yml)
[![Release](https://github.com/TensoRaws/Final2x/actions/workflows/Release.yml/badge.svg)](https://github.com/TensoRaws/Final2x/actions/workflows/Release.yml)
![Download](https://img.shields.io/github/downloads/TensoRaws/Final2x/total)
![GitHub](https://img.shields.io/github/license/TensoRaws/Final2x)

A cross-platform image super-resolution tool.

- News🎉: We are thrilled to announce the release of Final2x v2.0.0, which marks a major milestone as we transition to utilizing [ccrestoration](https://github.com/TensoRaws/ccrestoration) (PyTorch) for our algorithm implementation.
- News🎉: Want to enhance your video? Try [FinalRip](https://github.com/TensoRaws/FinalRip)!

### Screenshots

<div align=center>
<a href="https://sm.ms/image/NjpeUqToEc5kW12" target="_blank"><img src="https://s2.loli.net/2024/11/08/NjpeUqToEc5kW12.png" width="40%"></a>
<a href="https://sm.ms/image/IeHzQuKFJPLc6Vp" target="_blank"><img src="https://s2.loli.net/2024/11/08/IeHzQuKFJPLc6Vp.png" width="40%"></a>
</div>

### Installation

##### [Download the latest release from here.](https://github.com/TensoRaws/Final2x/releases)

#### Windows

Just Run! Furthermore, you can use package mananger to install and upgrade.

##### winget

```bash
winget install Final2x
```

#### MacOS

```bash
sudo spctl --master-disable
# Disable Gatekeeper, then allow applications downloaded from anywhere in System Preferences > Security & Privacy > General
xattr -cr /Applications/Final2x.app
```

In first time, you need to run the command above in terminal to allow the app to run.

#### Linux

For Linux User, you need to install the dependencies first.

Make sure you have Python >= 3.9 and PyTorch >= 1.13 installed

```bash
pip install Final2x-core
Final2x-core -h # check if the installation is successful
apt install -y libomp5 xdg-utils
```

### Visual Example

<div align="center">
<img src="https://s2.loli.net/2023/07/20/hWi4U6BNeqau3MF.png" />
</div>
<h5 align="center"> use Final2x to perform 4x super-resolution on a 256x256 Hutao RGBA image </h5>

### Reference

The following references were referenced in the development of this project:

- [Final2x-core](https://github.com/TensoRaws/Final2x-core)
- [ccrestoration](https://github.com/TensoRaws/ccrestoration)
- [PyTorch](https://github.com/pytorch/pytorch)
- [ncnn](https://github.com/Tencent/ncnn)
- [naive-ui](https://github.com/tusen-ai/naive-ui)
- [electron-vite](https://github.com/alex8088/electron-vite)

### License

This project is licensed under the BSD 3-Clause - see
the [LICENSE file](https://github.com/TensoRaws/Final2x/blob/main/LICENSE) for details.

### Acknowledgements

Feel free to reach out to the project maintainers with any questions or concerns~

<a href="https://star-history.com/#TensoRaws/Final2x&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=TensoRaws/Final2x&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=TensoRaws/Final2x&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=TensoRaws/Final2x&type=Date" />
  </picture>
</a>
