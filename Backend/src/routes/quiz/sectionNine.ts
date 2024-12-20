import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";
import { addMissingQuestions } from "../../utils/addEmptyQuestion";

const sectionNineRouter = Router();

//Section 9 Question 1
sectionNineRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "9",
        instructions:
            "This test explores the participant's visual field.\nThe instructor asks the participant to look at the tip of the instructor's nose throughout the duration of the test.\nThe instructor stretches out their arms to the sides with palms open.\nWhile moving the fingers in each hand alternatively, the instructor asks the participant if they can see the fingers move from the corner of their eye.\nThe instructor performs this movement first at their waist level and then at their head level, while asking the participant if they can see the fingers move each time.\nIf the participant is able to see the fingers move in all points, the peripheral vision is non-impaired.\nLastly, the instructor moves their index finger from their nose tip to the participant's nose tip and asks if they are able to see the finger across the movement.\nIf the participant can see it, the central vision is also non-impaired.",
        question:
            "Is the participant ABLE to DETECT HAND in ALL POSITIONS (QUADRANTS)",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1jTr7Mf__ntfAXY41cazHg3dZfzYRPGNY/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1kuvn4dul-WAfGCplVlraDii3aQ8ZsoC0/view?usp=sharing",
        mc: true,
        title: "Visual Field",
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "9";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    if (req.body.answer === "Yes") {
        nextQuestionID = 1;
        nextSectionID = "10";
        //1
        addMissingQuestions(data.uuid, data.section, [2], [""]);
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 9 Question 2
sectionNineRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "9",
        instructions:
            "HERE THE INSTRUCTOR SELECTS THE QUADRANTS IN WHICH THE PARTICIPANT CANNOT DETECT THE HAND",
        question: "",
        answers: ["", ""],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Visual Field",
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "10";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "REDUCED VISUAL FIELD" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionNineRouter;
