class MemoService {
  set(name, value) {
    localStorage.setItem(name, value);
  }

  get(name) {
    return localStorage.getItem(name) || "";
  }
}

const memoService = new MemoService();

export default memoService;
