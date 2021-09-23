import styled from "styled-components";

export const Engrave = styled.article`
  display: flex;
  align-items: center;

  .img-container {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: url("//cdn-lostark.game.onstove.com//2018/obt/assets/images/common/game/bg_equipment_slot_engrave_over.png?dfa049c7fe18a5887b24c846db7b2dcc")
        no-repeat center;
      background-size: 138% 138%;
      width: 40px;
      height: 40px;
    }

    img {
      border-radius: 50%;
    }
  }
`;

export const Desc = styled.div`
  width: calc(100% - 0.5rem - 40.1px);
`;
