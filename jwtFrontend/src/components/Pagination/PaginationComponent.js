import { Pagination } from "antd";
import "./PaginationComponent.scss";
const PaginationComponent = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <div className="page-container">
      <Pagination total={30} defaultCurrent={1} onChange={onChange} />
    </div>
  );
};
export default PaginationComponent;
