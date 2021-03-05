import styled, { keyframes } from "styled-components";
import styles from "../../styles/Footer.module.sass";

const heartBeat = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

const DesignedBy = styled.p`
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 14px;
    padding-top: 8px;
  }
  @media (max-width: 385px) {
    flex-direction: column;
    & span {
      margin: 6px;
    }
  }
  & span {
    display: inline-block;
    font-style: normal;
    animation: ${heartBeat} alternate 0.5s ease-in-out infinite;
  }
  & div {
    margin: 0 4px;
  }
`;

const Footer = () => (
  <div className={styles.container}>
    <a href="https://explorer-mumbai.maticvigil.com/address/0x42da4804CFF6f81B256516a36431AA122ee42559/transactions">
      <DesignedBy>
        Deployed @ Matic Mumbai Testnet
        <br></br>
        Wallet Providers: Portis & MetaMask
      </DesignedBy>
    </a>
    <DesignedBy>
      <div>designed and built with</div>
      {"  "}
      <span role="img" aria-label="heart emoji">
        ❤️
      </span>
      {"  "}
      <div>by Team codeDcode</div>
    </DesignedBy>
  </div>
);

export default Footer;
