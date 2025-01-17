import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";
import { addMissingQuestions } from "../../utils/addEmptyQuestion";

const sectionTwoRouter = Router();

//Section 2 Question 1
sectionTwoRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "Is the participant able to precisely perform the task with EYES OPEN?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1jlzgcbMZn-LTAkkoe8np6tDxaFDW2BBk/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1kqntB-R5QNZWJSWo2rd0N6cD4lDQVn4n/view?usp=sharing",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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
        nextQuestionID = 3;
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 2
sectionTwoRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: [
            "Participant is  UNABLE to precisely REACH nose with one or both hands",
            "Participant STRUGGLES to precisely REACH nose with one or both hands",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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

    if (
        req.body.answer ===
        "Participant is  UNABLE to precisely REACH nose with one or both hands"
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer ===
        "Participant STRUGGLES to precisely REACH nose with one or both hands"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 3
sectionTwoRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question:
            "Is the participant able to perform the task with EYES CLOSED?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1VFvw-b-V1XuafkIWyVmxCZi9dNOScpkD/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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
        nextSectionID = "3";
        //1, 3
        addMissingQuestions(
            data.uuid,
            data.section,
            [2, 4, 5, 6, 7, 8],
            ["", "", "", "", "", ""]
        );
    } else if (req.body.answer === "No") {
        nextQuestionID = 6;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 4
sectionTwoRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: ["LEFT HAND", "RIGHT HAND", "BOTH HANDS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "3";

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
                "SEVERE UL Coordination Impairment" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 2, 4
    addMissingQuestions(
        data.uuid,
        data.section,
        [3, 5, 6, 7, 8],
        [
            "Is the participant able to perform the task with EYES CLOSED?",
            "",
            "",
            "",
            "",
        ]
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 5
sectionTwoRouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: ["LEFT HAND", "RIGHT HAND", "BOTH HANDS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "3";

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
                "MILD UL Coordination Impairment" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 2, 5
    addMissingQuestions(
        data.uuid,
        data.section,
        [3, 4, 6, 7, 8],
        [
            "Is the participant able to perform the task with EYES CLOSED?",
            "",
            "",
            "",
            "",
        ]
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 6
sectionTwoRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: [
            "Participant is UNABLE to precisely REACH nose with one or both hands",
            "Participant STRUGGLES to REACH nose with one or both hands",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/6", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "2";

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

    if (
        req.body.answer ===
        "Participant is UNABLE to precisely REACH nose with one or both hands"
    ) {
        nextQuestionID = 7;
    } else if (
        req.body.answer ===
        "Participant STRUGGLES to REACH nose with one or both hands"
    ) {
        nextQuestionID = 8;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 7
sectionTwoRouter.get("/7/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: ["LEFT HAND", "RIGHT HAND", "BOTH HANDS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/7", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "7a";

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
                "POTENTIAL MODERATE UL Deep Sensitivity Impairment" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 3, 6, 7
    addMissingQuestions(
        data.uuid,
        data.section,
        [2, 4, 5, 8],
        ["", "", "", ""]
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 8
sectionTwoRouter.get("/8/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "2",
        instructions:
            "Ask the participant to touch the tip of their nose with the tip of both index fingers alternatively.\n Repeat at least ten times (five with each hand) with eyes open, and ten times with eyes closed.",
        question: "",
        answers: ["LEFT HAND", "RIGHT HAND", "BOTH HANDS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Nose - Index",
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "7a";

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
                "POTENTIAL MILD UL Deep Sensitivity Impairment" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    //1, 3, 6, 8
    addMissingQuestions(
        data.uuid,
        data.section,
        [2, 4, 5, 7],
        ["", "", "", ""]
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionTwoRouter;
