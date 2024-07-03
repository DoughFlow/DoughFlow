"use client"
import React from 'react';
import "../globals.css";
import Image from "next/image";

const Info = () => {
  return (  
  <div className="bg-dfBlack">

  <div className="drop-shadow-2xl min-w-screen bg-dfBrown text-[2.25rem]
  text-dfWhite py-[.75rem] flex flex-row justify-center items-center border-b-[.55rem] 
  border-dfGold border-opacity-70 sticky md:desktop-info-header">
    <a href="/">
      <div>
        DoughFlow
      </div>
    </a>
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
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/next.png" alt="NextJS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/next.png" alt="NextJS" width={100} height={100} className="hidden md:block min-w-[4rem] mr-5"/>
      Using NextJS allowed us to learn TypeScript and be exposed to a front-end
      react framework. Because of its recency, relying solely on the docs to
      develop proved to be a satisfying challenge and limited our use of
      LLMs.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/django.png" alt="Django" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/django.png" alt="Django" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Django Rest Framework was used to create our back-end API, utilizing its
      Object Relational Model, we were able to write all of our Database
      models and interactions in Python rather than SQL.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/postgres.png" alt="PostgreSQL" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/postgres.png" alt="PostgreSQL" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      PostgreSQL served as a robust database engine and object-relational
      database management system. Its extensive documentation and open-source
      status allowed us to get off the ground quickly. Our production database
      has upwards of 5 million rows.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/aws.png" alt="AWS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/aws.png" alt="AWS" width={100} height={100} className="hidden md:block min-w-[5rem] mr-5"/>
      Amazon Web Services was critical to the delivery of, and the hosting for
      our application. Our most used services included Amazon EC2, IAM Identity Center, 
      and Amazon Secrets Manager.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/docker.png" alt="NextJS" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/docker.png" alt="NextJS" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Our application is succesfully dockerized, scalable, and deployable via
      our custom GitHub-integrated deployment pipeline written in bash. We also
      leveraged Docker to create consistent development environments.
    </li>
    <li className="flex flex-row items-center mb-[2.25rem] md:mb-[2.5rem] border-2">
      <Image src="/nginx.png" alt="nginx" width={50} height={50} className="md:hidden min-w-[3rem] mr-3"/>
      <Image src="/nginx.png" alt="nginx" width={50} height={50} className="hidden md:block min-w-[5rem] mr-5"/>
      Nginx is the core web server that allows our app to reverse proxy client-side
      requests. It enabled more robust security and easier deployment.
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
      <div className="w-[11rem] bg-dfYellow bg-opacity-75 rounded-sm
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
            -AWS Organizer
          </li>
          <li>
            -API + Database
          </li>
          <li>
            -Visualiztion
          </li>
          <li>
            -Data Validation
          </li>
        </ul>
      </div>
      <div className="w-[11rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="">
          <h1 className="flex justify-center items-center md:text-[2.25rem]
          leading-[4.5rem]">
            Jack Messerli-Wallace
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1 
          flex justify-center md:text-[1.25rem]">
            Front-End Researcher
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -Product Presentations
          </li>
          <li>
            -Initial Candle Design
          </li>
          <li>
            -NextJS Router Setup
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-row justify-between md:justify-center mb-[4rem] 
    md:mb-[10rem]">
      <div className="w-[11rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="https://marcusandrist.github.io/">
          <h1 className="flex justify-center md:text-[3rem]">
            Marcus Andrist
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1 
          flex justify-center md:text-[1.25rem]">
            Full-Stack Developer + Scrum Master
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -User Interface
          </li>
          <li>
            -Visualization
          </li>
          <li>
            -Git Master
          </li>
          <li>
            -Database Population (ETL)
          </li>
        </ul>
      </div>
      <div className="w-[11rem] bg-dfYellow bg-opacity-75 rounded-sm
      md:desktop-hero">
        <a href="">
          <h1 className="flex justify-center items-center md:text-[3rem]">
            Aidan Freese
          </h1>
        </a>
          <h2 className="bg-dfGray bg-opacity-75 mx-[.25rem] text-[.75rem] px-1
          flex justify-center md:text-[1.25rem]">
            Deployment Pipeline Researcher
          </h2>
        <ul className="ml-[.33rem] text-[.85rem] md:desktop-notable-work">
          <li>
            Notable Work:
          </li>
          <li>
            -GitHub actions
          </li>
          <li>
            -nginx upstream configs
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
