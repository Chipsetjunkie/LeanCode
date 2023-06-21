<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">LeanCode </h3>

  <p align="center">
    A client side code execution sandbox mimicking some of leetcode's functionality.
    <br />
    <br />
    <a href="https://lean-code-rlosrqha4-chipsetjunkie.vercel.app/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This is a side project focused on creating a code sandbox that allows code execution on the client-side. The main goal was to explore the idea of building a minimalistic sandbox similar to platforms like LeetCode. 

The project explores both firebase and localstorage as db sources. The main branch uses localstorage as db and authencation is maintained across sessions. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Next][Next.js]][Next-url]
[![Firebase][Firebase-shield]][Firebase-url]
[![Tailwind][Tailwind-shield]][Tailwind-url]
[![Recoil][Recoil.js]][Recoil-url]
[![Codemirror][Codemirror-shield]][Codemirror-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is a standard Nextjs project. Do install the necessary pacakges and get hacking. Do note that, the authentication flow in the main branch branch is simulated one, rather than making a direct api call. If you intend to have a backend service, do checkout out the firebase branch. The basic implementatio is already in place with basic sandbox functionality. Intially, started with firebase but later decided to disable it due to billing paranoa 😅

### Installation
* To get started do install the pacakges using the following command
  ```sh
  npm install 
  ```


* To run in dev mode
  ```sh
  npm run dev 
  ```

<br/>  
NOTE: You will have to setup envs by yourself, do refere env type declaration(env.d.ts) for naming conventions.


<!-- ROADMAP -->
## Roadmap

- [ ] Move code execution to workers
- [ ] Truncate output
- [ ] Handle non-primitive inputs
- [ ] Handle timeout and rogue loops

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Project Link: [https://github.com/Chipsetjunkie/LeanCode](https://github.com/Chipsetjunkie/LeanCode)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Firebase-shield]: https://img.shields.io/badge/firebase-000000?style=for-the-badge&logo=firebase&logoColor=#FFCA28
[Firebase-url]:https://firebase.google.com/
[Tailwind-shield]: https://img.shields.io/badge/Tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=#06B6D4
[Tailwind-url]:https://tailwindcss.com/
[Recoil.js]: https://img.shields.io/badge/Recoil.js-000000?style=for-the-badge
[Recoil-url]:https://recoiljs.org/
[Codemirror-shield]:https://img.shields.io/badge/Codemirror-000000?style=for-the-badge&logo=codemirror&logoColor=#D30707
[Codemirror-url]: https://codemirror.net/
