module.exports.Error_Code = Object.freeze({
    Internal_Error: 500,
    AlreadyExist: 409,
    NotFound: 404,
    NotMatch: 401,
  });
  
  module.exports.Success_Code = Object.freeze({
    Success: 200,
  });
  
  module.exports.Error_Message = Object.freeze({
    InternalError: "Internal Server Error.",
    EmailExist: "Email Already Exist.",
    NameExist: "UserName Already Exist.",
    NotMatch: "Passwords don't Match.",
    InvalidLogin: "Invalid Login.",
    NotExist: "User Doesnot Exist.",
    Not_Found: "Token Not Found.",
    NoData: "No Data Found.",
    IdExist: "Id Already Exist."
  });
  module.exports.Success_Message = Object.freeze({
    SignUp_Successfully: "Thank you, You are successfully SignUp.",
    Login: "Login Successfully.",
    DataFound: "Data Found Successfully.",
    Deleted: "User Delete Successfully.",
  });
  