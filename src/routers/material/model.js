function rgcontent_m(body) {
  // cat_id , question, answer , disc

  return {
    QS: body.question,
    DISC: body.disc,
    ANSWER: body.answer,
    CAT_ID: body.cat_id,
  };
}

export { rgcontent_m };
