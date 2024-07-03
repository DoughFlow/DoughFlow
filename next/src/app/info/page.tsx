"use client"
import React from 'react';
import "../globals.css";
import Image from "next/image";

const Info = () => {
  return (  
  <div className="bg-dfBlack md:bg-dfWhite">

  <div className="drop-shadow-2xl min-w-screen bg-dfBrown text-[2.25rem]
  text-dfWhite py-[.75rem] flex flex-row justify-center items-center border-b-[.55rem] 
  border-dfGold border-opacity-70 sticky md:desktop-info-header">
    <div>
      DoughFlow
    </div>
    <a href="https://github.com/DoughFlow/DoughFlow" title="Check out our GitHub!">
      <Image src="/github-mark-white.png" alt="GitHub Link" width={40} height={40}
      className="ml-[.55rem] flex md:hidden"/>
      <Image src="/github-mark-white.png" alt="GitHub Link" width={85} height={85}
      className="ml-[.55rem] hidden md:block"/>
    </a>
  </div>

  <div className="flex flex-col mx-[1.25rem] bg-dfBrown bg-opacity-95 pt-4
  px-[.75rem] text-[1.15rem] md:desktop-info-page">
  <h1 className="text-[2rem] md:text-[5rem] w-max px-2 py-1 rounded-sm">
    About Us
  </h1>
  <h2 className="bg-dfWhite bg-opacity-50 px-1 rounded-sm text-[1.55rem] mb-4
  md:text-[2.75rem] md:px-[4rem] md:py-[2rem]">
    DoughFlow is cross-platform web application for creating complex and
    insightful visualizations of stock data using an intuitive UI.
  </h2>
  <ul className="pt-[.75rem] text-[.8rem] md:desktop-technologies-list">
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/next.png" alt="NextJS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/next.png" alt="NextJS" width={100} height={100} className="hidden md:block min-w-[4rem] mr-5"/>
      Well next was really good and we utilized it well, it was difficult because
      of newer docs and no ChatGPT and yeawh overall it was a really great time
      and we struggled with ex wqawhyt and z buit it went good.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/django.png" alt="Django" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/django.png" alt="Django" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Django Rest Framework was used to create our back-end API, utilizing its
      Object Relational Model, we were able to write all of our Database
      models and interactions in Python rather than SQL.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/postgres.png" alt="PostgreSQL" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/postgres.png" alt="PostgreSQL" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      PostgreSQL served as a robust database engine and object-relational
      database management system. Its extensive documentation and open-source
      status allowed us to get off the ground and dockerize our DB environment
      quickly and effectively.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/aws.png" alt="AWS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/aws.png" alt="AWS" width={100} height={100} className="hidden md:block min-w-[5rem] mr-5"/>
      Amazon Web Services was critical to the delivery of, and the hosting for
      application. Our most used services included Amazon EC2, IAM Identity Center, 
      and Amazon Secrets Manager.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/docker.png" alt="NextJS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/docker.png" alt="NextJS" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Our application is succesfully dockerized, scalable, and deployable via
      our custom GitHub-integrated deployment pipeline written in bash. We also
      leveraged Docker to create consistent development environments.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[5rem]">
      <Image src="/nginx.png" alt="nginx" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/nginx.png" alt="nginx" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Nginx is the core web server that allows our app to reverse proxy client-side
      requests, enabling more robust security, deployment, and load-balancing.
    </li>
  </ul>
  <h1 className="text-[2rem] md:text-[5rem] w-max px-2 rounded-sm">
    Meet The Team!
  </h1>
  <h1 className="text-[.75rem] mb-[1.5rem] md:text-[2rem] w-max px-2 rounded-sm">
    Click a name to jump to their personal site/portfolio.
  </h1>
  <div className="flex flex-col">
    <div className="flex flex-row justify-between mb-[1.5rem] md:justify-center">
      <div className="w-[9rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="https://ethanrohman.com/">
          <h1 className="flex justify-center md:text-[3rem]">
            Ethan Rohman
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1 
          flex justify-center md:text-[1.25rem]">
            Full-Stack Developer + Lead Architect
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
        </ul>
      </div>
      <div className="w-[9rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="">
          <h1 className="flex justify-center items-center md:text-[3rem]">
            Jack Messerli-
          </h1>
          <h1 className="flex justify-center items-center md:text-[3rem]">
            Wallace
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1 
          flex justify-center md:text-[1.25rem]">
            NextJS framework specialist + Math Guru
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-row justify-between md:justify-center mb-[4rem] 
    md:mb-[10rem]">
      <div className="w-[9rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="https://marcusandrist.github.io/">
          <h1 className="flex justify-center md:text-[3rem]">
            Marcus Andrist
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1 
          flex justify-cente md:text-[1.25rem]">
            Full-Stack Developer + Scrum Master
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
        </ul>
      </div>
      <div className="w-[9rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="">
          <h1 className="flex justify-center items-center md:text-[3rem]">
            Aidan Freese
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1
          flex justify-center md:text-[1.25rem]">
            IAC Research Lead
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -one thang
          </li>
          <li>
            -one thang
          </li>
        </ul>
      </div>
    </div>
  </div>

  </div>

  </div>

  );
};

export default Info;
