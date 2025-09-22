export const TASK_LIST = `
  query TaskList {
    TaskList {
      id
      title
      status
      description
    }
  }
`;

export const LOGIN = `
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user { id email name }
    }
  }
`;

export const GET_USER_TASKS = `
  query getUserTasks {
    getUserTasks {
      id title status description
    }
  }
`;

export const TASKS_BY_STATUS = `
  query TaskList($status: String) {
    TaskList(status: $status) {
      id title status description
    }
  }
`;
