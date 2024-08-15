export const constructPagination = ({
  page = "1",
  pageSize = "10",
}: {
  page?: string;
  pageSize?: string;
}) => {
  const skip = (+page - 1) * +pageSize;
  const take = (+page - 1) * +pageSize + +pageSize;
  console.log(skip);
  console.log(take);

  return { skip, take };
};
