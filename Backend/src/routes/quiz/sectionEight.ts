import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";
import { addMissingQuestions } from "../../utils/addEmptyQuestion";

const sectionEightRouter = Router();

//Section 8 Question 1
sectionEightRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "8",
        instructions:
            "Ask the participant to close their eyes with force for a few seconds.\nThen, ask them to smile showing their teeth.",
        question:
            "Is the participant able to perform correctly, comparing left and right in the EYES, MOUTH, or BOTH during the completion of the task, without showing ASYMMETRY?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1LDvk1Plhg94l5g5Qri-ISI_l4fknTTyi/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1kk17kKpWfrpalDtABvgGnUgHmcNkjVTV/view?usp=sharing",
        mc: true,
        title: "Smile/Strong Eye Closing",
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "8";

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

    if (req.body.answer === "No") {
        nextQuestionID = 2;
    } else if (req.body.answer === "Yes") {
        nextQuestionID = 1;
        nextSectionID = "9";
        //1
        addMissingQuestions(data.uuid, data.section, [2, 3], ["", ""]);
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 8 Question 2
sectionEightRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "8",
        instructions:
            "Ask the participant to close their eyes with force for a few seconds.\nThen, ask them to smile showing their teeth.",
        question: "",
        answers: [
            "Participant shows ASYMMETRY of the MOUTH;https://drive.google.com/file/d/1GPmKwzzAT8NxOqw9eDOpVeb4SF24jIss/view?usp=sharing;",
            "Participant shows ASYMMETRY of both the MOUTH and EYEBROWS;https://drive.google.com/file/d/1s_Fz4RXrfrjxddk9hE6tzi20llAbHTm3/view?usp=sharing;",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl: "",
        mc: true,
        title: "Smile/Strong Eye Closing",
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "8";

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

    if (req.body.answer === "Participant shows ASYMMETRY of the MOUTH") {
        nextQuestionID = 1;
        nextSectionID = "9";
        pool.query(
            deleteOutcome,
            [data.uuid, data.section],
            (error, results) => {
                if (error) throw error;
                pool.query(
                    addOutcome,
                    [
                        data.uuid,
                        data.section,
                        "MILD Strength Impairment" + " - " + data.answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        );
        //1, 2
        addMissingQuestions(data.uuid, data.section, [3], [""]);
    } else if (
        req.body.answer ===
        "Participant shows ASYMMETRY of both the MOUTH and EYEBROWS"
    ) {
        nextQuestionID = 3;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 8 Question 3
sectionEightRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "8",
        instructions:
            "Ask the participant to close their eyes with force for a few seconds.\nThen, ask them to smile showing their teeth.",
        question: "",
        answers: ["LEFT eye blink impaired", "RIGHT eye blink impaired"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Smile/Strong Eye Closing",
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "Facial Nerve PARALYSIS (PERIPHERAL)" + " - " + data.answer,
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

export default sectionEightRouter;
