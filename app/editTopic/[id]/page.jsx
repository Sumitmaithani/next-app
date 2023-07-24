import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const {
    School,
    Degree,
    FieldOfStudy,
    StartDate,
    EndDate,
    Grade,
    Description,
    Subjects
  } = topic;

  return (
    <EditTopicForm
      id={id}
      School={School}
      Degree={Degree}
      FieldOfStudy={FieldOfStudy}
      StartDate={StartDate}
      EndDate={EndDate}
      Grade={Grade}
      Description={Description}
      Subjects={Subjects}
    />
  );
}
