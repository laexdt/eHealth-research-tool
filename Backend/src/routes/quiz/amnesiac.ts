import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import {
    addAnamnesticOutcome,
    addData,
    deleteOneAnamnesticOutcome,
    deleteOneData,
} from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const anamnesticRouter = Router();

//Section anamnestic Question 1
anamnesticRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced, or has someone in your family or friends told you that they have noticed in you some kind of TREMOR?",
        answers: [
            "No tremor experienced by the participant or noticed by those close to them. (cannot be selected with others)",
            "Yes, tremor noticed by those close to the participant",
            "Yes, tremor experienced by the participant",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: false,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 2;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer[0].includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "TREMOR", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 2
anamnesticRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced, or has someone in your family or friends told you that they have noticed in you some kind of difficulty in SPEAKING?",
        answers: [
            "No difficulty in speaking experienced by the participant or noticed by those close to them. (cannot be selected with others)",
            "Yes, difficulty in speaking noticed by someone close to the participant",
            "Yes, difficulty in speaking experienced by the participant",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: false,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 3;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer[0].includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "DIFFICULTY IN SPEAKING", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 3
anamnesticRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced CHOKING more than usual when eating or drinking?",
        answers: [
            "No choking experienced by the participant.",
            "Yes, choking experienced by the participant.",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 4;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "CHOKING", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 4
anamnesticRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced any PAIN that interfered with your daily activities or that woke you up from sleep?",
        answers: ["No pain experienced.", "Yes, pain experienced.;;;EnterInfo"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 5;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "PAIN", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 5
anamnesticRouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced any HEADACHE that interfered with your daily activities or that woke you up from sleep?",
        answers: [
            "No headache experienced.",
            "Yes, experienced headache less than 3 times per year.",
            "Yes, experienced headache between 3 and 10 times per year.",
            "Yes, experienced headache atleast once a month.",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 6;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "HEADACHE", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 6
anamnesticRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced DIZZINESS or UNSTEADINESS when standing?",
        answers: [
            "No dizziness or unsteadiness experienced.",
            "Yes, experienced dizziness or unsteadiness.",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/6", (req: Request, res: Response) => {
    let nextQuestionID = 7;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "DIZZINESS/UNSTEADINESS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 7
anamnesticRouter.get("/7/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you experienced a TINGLING or UNUSUAL SENSATIONS (e.g., pins and needles) in any parts of your body?",
        answers: [
            "No unusual sensations experienced.",
            "Yes, tingling or another unusual sensation experienced for a few hours once;;;EnterInfo",
            "Yes, tingling or another unusual sensation experienced for a full day;;;EnterInfo",
            "Yes, tingling or another unusual sensation experienced permanently;;;EnterInfo",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/7", (req: Request, res: Response) => {
    let nextQuestionID = 8;
    let nextSectionID = "anamnestic";

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
    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "TINGLING/UNUSUAL SENSATIONS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 8
anamnesticRouter.get("/8/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "anamnestic",
        instructions: "",
        question:
            "In the past year, have you noticed that you are SLOWER in performing daily activities (e.g., combing your hair)?",
        answers: ["No slowness experienced.", "Yes, slowness experienced."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 9;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "SLOWNESS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 9
anamnesticRouter.get("/9/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "anamnestic",
        instructions: "",
        question:
            "Have you ever lost consciousness and experienced loss of bladder control or foam at the mouth?",
        answers: ["No.", "Yes.", "I don't know."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/9", (req: Request, res: Response) => {
    let nextQuestionID = 10;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "LOST CONCIOUSNESS / BLADDER CONTROL / FOAM AT MOUTH", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 10
anamnesticRouter.get("/10/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "10",
        section: "anamnestic",
        instructions: "",
        question:
            "Have you ever experienced absence(s) or sudden loss(es) of contact with the surroundings, for a short duration of time?",
        answers: ["No.", "Yes.", "I don't know."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/10", (req: Request, res: Response) => {
    let nextQuestionID = 11;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "LOSS OF CONTACT WITH SURROUNDINGS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 11
anamnesticRouter.get("/11/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "11",
        section: "anamnestic",
        instructions: "",
        question:
            "Have you ever experienced sudden, uncontrollable twitching or shaking of your arms, legs or head, for a period of a few minutes?",
        answers: ["No.", "Yes.", "I don't know."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/11", (req: Request, res: Response) => {
    let nextQuestionID = 12;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "TWITCHING / SHAKING", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 12
anamnesticRouter.get("/12/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "12",
        section: "anamnestic",
        instructions: "",
        question:
            "Do you sometimes experience sudden and brief bodily sensations, see or hear things that are not there, or smell strange odours?",
        answers: ["No.", "Yes.", "I don't know."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/12", (req: Request, res: Response) => {
    let nextQuestionID = 13;
    let nextSectionID = "anamnestic";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "SEEING THINGS / STRANGE ODOURS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section anamnestic Question 13
anamnesticRouter.get("/13/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "13",
        section: "anamnestic",
        instructions: "",
        question:
            "Have you ever been told that you are suffering from epilepsy or that you have already had epileptic fits?",
        answers: ["No.", "Yes.", "I don't know."],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Anamnestic",
    };

    res.status(200).json(nextQuery);
});

anamnesticRouter.post("/13", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "42";

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

    pool.query(
        deleteOneAnamnesticOutcome,
        [data.uuid, data.q_id],
        (error, results) => {
            if (error) throw error;
            if (data.answer.includes("Yes")) {
                pool.query(
                    addAnamnesticOutcome,
                    [data.uuid, "EPILEPTIC FITS", data.q_id],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default anamnesticRouter;
