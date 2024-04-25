# Umbraco.Community.Sustainability

[![Downloads](https://img.shields.io/nuget/dt/Umbraco.Community.Sustainability?color=cc9900)](https://www.nuget.org/packages/Umbraco.Community.Sustainability/)
[![NuGet](https://img.shields.io/nuget/vpre/Umbraco.Community.Sustainability?color=0273B3)](https://www.nuget.org/packages/Umbraco.Community.Sustainability)
[![GitHub license](https://img.shields.io/github/license/rickbutterfield/Umbraco.Community.Sustainability?color=8AB803)](https://github.com/rickbutterfield/Umbraco.Community.Sustainability/blob/main/LICENSE)

A package from the [Umbraco Community Sustainability Team](https://umbraco.com/blog/meet-the-new-community-sustainability-team/) which helps developers and editors see and improve the carbon impact of their websites.

## Features
Once installed, two new features are enabled:

### Sustainability section
A section is enabled automatically for admin users that allows tracking of average stats based on recent tests, plus a breakdown of all scores per page.

![Umbraco.Community.Sustainability dashboard](https://raw.githubusercontent.com/rickbutterfield/Umbraco.Community.Sustainability/main/.github/assets/sustainability-dashboard-1.png")

### Sustainability content app
On each content page, a Content App is added which allows users to see and benchmark page weight and carbon emissions, which is then converted to a carbon rating for individual pages.

![Umbraco.Community.Sustainability content app](https://raw.githubusercontent.com/rickbutterfield/Umbraco.Community.Sustainability/main/.github/assets/sustainability-contentapp-2.jpeg")

## Installation

Add the package to an existing Umbraco website (v10.8.0+) from nuget:

`dotnet add package Umbraco.Community.Sustainability`

Once added, a new Content App will be available alongside your Umbraco pages allowing you to trigger a sustainability report.

## License

Copyright &copy; [Rick Butterfield](https://github.com/rickbutterfield), [Thomas Morris](https://github.com/tcmorris) and other contributors.

Licensed under the [MIT License](https://github.com/rickbutterfield/Umbraco.Community.Sustainability/blob/main/LICENSE.md).
