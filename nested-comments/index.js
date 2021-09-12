let input = document.getElementById("input");
let btn = document.querySelector(".btn");
let commentList = document.getElementById("commentList");

btn.addEventListener("click", addComment);

let comments = [];

function addComment() {
  comments.push({
    parentCommentId: null,
    commentId: Math.random().toString().substr(2, 7),
    commentText: input.value,
    childComments: [],
    likes: 0,
  });

  console.log(comments);
  finalCommentsViewPage();
  input.value = "";
}

function finalCommentsViewPage() {
  let allComments = createRecusiveView(comments);
  commentList.innerHTML = allComments;
}

function createRecusiveView(commentList, margin = 0) {
  let fullView = "";
  for (let i of commentList) {
    fullView += singleCommentCard(i, margin);
    if (i.childComments.length > 0) {
      fullView += createRecusiveView(i.childComments, (margin += 20));
      margin -= 20;
    }
  }
  return fullView;
}

function singleCommentCard(obj, margin) {
  return `
    <div style="background-color: white; margin-left: ${margin}px; border: 2px solid red; width: 400px; margin-top:2px;" data-parentId="${
    obj.parentCommentId
  }" id="${obj.commentId}">
    ${obj.commentText}
        <a href="#" id="likes">Likes</a><span style="color: red"> ${
          obj.likes === 0 ? "" : obj.likes
        }</span>
        <a href="#" id="reply">Reply</a><span style="color: red"> ${
          obj.childComments.length === 0 ? "" : obj.childComments.length
        }</span>
        <a href="#" id="edit"> Edit</a>
        <a href="#" id="delete"> Delete </a>
    </div>
    `;
}

function createReplyButtonCommentView(id, operationType, commentOldData) {
  let div = document.createElement("div");
  div.setAttribute("data-parentId", id);
  div.innerHTML = `<input type="text" value="${
    operationType === "update Comment" ? commentOldData : ""
  }"> <a href="#">${operationType}</a>`;

  return div;
}

// recursive method to push the new child comment
let addNewChildComment = (allComments, newComment) => {
  for (let i of allComments) {
    if (i.commentId === newComment.parentCommentId) {
      i.childComments.push(newComment);
    } else if (i.childComments.length > 0) {
      addNewChildComment(i.childComments, newComment);
    }
  }
};

let increaseLikeByOne = (allComments, newCommentLikeId) => {
  for (let i of allComments) {
    if (i.commentId === newCommentLikeId) {
      i.likes += 1;
    } else if (i.childComments.length > 0) {
      increaseLikeByOne(i.childComments, newCommentLikeId);
    }
  }
};

// recursive method to update the comment
let updateComment = (allComments, updatedCommentId, updatedCommentText) => {
  for (let i of allComments) {
    if (i.commentId === updatedCommentId) {
      i.commentText = updatedCommentText;
    } else if (i.childComments.length > 0) {
      updateComment(i.childComments, updatedCommentId, updatedCommentText);
    }
  }
};

// recursive function for deleting a single comment
let deleteComment = (allComments, newCommentId) => {
  for (let i in allComments) {
    if (allComments[i].commentId === newCommentId) {
      allComments.splice(i, 1);
    } else if (allComments[i].childComments.length > 0) {
      deleteComment(allComments[i].childComments, newCommentId);
    }
  }
};

commentList.addEventListener("click", function (e) {
  if (e.target.id === "reply") {
    const parentId = e.target.parentNode.getAttribute("id");
    const currentParentComment = e.target.parentNode;
    currentParentComment.appendChild(
      createReplyButtonCommentView(parentId, "Add Comment")
    );
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "none";
  } else if (e.target.innerText === "Add Comment") {
    const parentId = e.target.parentNode.getAttribute("data-parentId");
    const newAddedComment = {
      parentCommentId: parentId,
      commentId: Math.random().toString().substr(2, 7),
      commentText: e.target.parentNode.firstChild.value,
      childComments: [],
      likes: 0,
    };
    addNewChildComment(comments, newAddedComment);
    finalCommentsViewPage();
  } else if (e.target.id === "likes") {
    increaseLikeByOne(comments, e.target.parentNode.id);
    finalCommentsViewPage();
  } else if (e.target.id === "edit") {
    const parentId = e.target.parentNode.getAttribute("id");
    const currentParentComment = e.target.parentNode;

    const complateCommentText = e.target.parentNode.innerText;
    const commentToArray = complateCommentText.split(" ");
    const findIndexOfLikes = commentToArray.indexOf("Likes");
    const realComment = commentToArray.slice(0, findIndexOfLikes);

    currentParentComment.appendChild(
      createReplyButtonCommentView(
        parentId,
        "update Comment",
        realComment.join(" ")
      )
    );
    e.target.style.display = "none";
  } else if (e.target.innerText === "update Comment") {
    const parentId = e.target.parentNode.getAttribute("data-parentId")
      ? e.target.parentNode.getAttribute("data-parentId")
      : e.target.parentNode.getAttribute("id");

    updateComment(comments, parentId, e.target.parentNode.firstChild.value);
    finalCommentsViewPage();
  } else if (e.target.id === "delete") {
    const parentId = e.target.parentNode.getAttribute("id");
    deleteComment(comments, parentId);
    finalCommentsViewPage();
  }
});
