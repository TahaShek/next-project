import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/new-meetup", {
    method: "GET",
  });
  const data = await response.json();

  return {
    props: {
      meetups: data.data,
    },
  };
}

export default HomePage;
