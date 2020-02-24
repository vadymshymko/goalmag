import styled from 'styled-components';

const Wrapper = styled.div`
  margin: auto;
  padding: 0 16px;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 542px;
  }

  @media (min-width: 768px) {
    max-width: 722px;
  }

  @media (min-width: 992px) {
    max-width: 962px;
  }

  @media (min-width: 1200px) {
    max-width: 1142px;
  }
`;

export default Wrapper;
