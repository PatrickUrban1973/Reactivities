namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSucess { get; set; }
        public T Value { get; set; }

        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T>(){Value = value, IsSucess = true}; 
        public static Result<T> Failure(string error) => new Result<T>(){Error = error, IsSucess = false}; 
    }
}