import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  // console.log(props);
  return (
    <>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      ></MeetupDetail>
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://tahashekh789:afsRtbVxA6mM9QTF@meetup-cluster.oagg7q6.mongodb.net/"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetup");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));
  client.close();

  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://tahashekh789:afsRtbVxA6mM9QTF@meetup-cluster.oagg7q6.mongodb.net/"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetup");
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  selectedMeetup._id = selectedMeetup._id.toString();

  client.close();

  return {
    props: {
      id: selectedMeetup._id,
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      image: selectedMeetup.image,
      description: selectedMeetup.description,
    },
  };
}

export default MeetupDetails;
