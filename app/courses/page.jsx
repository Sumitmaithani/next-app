"use client";

import RemoveBtnCourse from "../../components/RemoveBtnCourse";
import Image from "next/image";

const getCourses = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/courses`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    console.log(res);
    return res.json();
  } catch (error) {
    console.log("Error loading courses: ", error);
  }
};

const getTopics = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const CompetencyAnalysis = async (courseSubjects) => {
  const { topics } = await getTopics();
  const totalCourseSubjects = courseSubjects.length;
  const matchingSubjects = courseSubjects.filter((subject) =>
    topics.some((obj) => obj.Subjects.includes(subject))
  );
  const totalMatchingSubjects = matchingSubjects.length;

  if (totalMatchingSubjects === totalCourseSubjects) {
    return 100; // All course subjects are present in the topic
  } else if (totalMatchingSubjects === 0) {
    return 0; // None of the course subjects are present in the topic
  } else {
    // Calculate the matching score in the range of 0 to 100
    const matchingScore = (totalMatchingSubjects / totalCourseSubjects) * 100;
    return Math.round(matchingScore);
  }
};

export default async function page() {
  const { courses } = await getCourses();

  return (
    <div className="mt-20">
      {courses.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div className="flex gap-3">
            <Image src={t.Image} alt="image" width={300} height={300} />
            <div>
              <h2 className="font-bold text-2xl">{t.Name}</h2>
              <div className="flex gap-2">
                <div>{t.Description}</div>
              </div>
              <div className="flex gap-2">
                <b>Learning Hours : </b>
                <div>{t.LearningHours}</div>
              </div>
              <div>CP : {CompetencyAnalysis(t.Subjects)}/100</div>
              <div className="flex items-center text-center">
                <div className="tag-containerless">
                  {t.Subjects.map((tag, index) => {
                    return (
                      <div key={index} className="tag">
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <RemoveBtnCourse id={t._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
