interface CollectionMini {
  title: string;
  getCount: string;
  totalCount: string;
}
interface CollectionDetail {
  type: string;
  divideType: string;
  detail: { subTitle: string[]; title: string; grade: string };
}
interface Props {
  collectionMini: CollectionMini[];
  collectionDetail: CollectionDetail[][];
}

export default class CollectionInfo implements Props {
  collectionMini: CollectionMini[] = [];
  collectionDetail: CollectionDetail[][] = [];

  constructor(co) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(co, "text/html");

    [...doc.getElementsByClassName("collection-list")].forEach(
      (colPart, index) => {
        const child = colPart.children;
        const title = child[0].children[0].textContent;
        const getCount = child[0].children[1].children[0].textContent;
        const totalCount = child[0].children[1].children[1].textContent;

        this.collectionMini.push({ title, getCount, totalCount });

        const detail = [...child[1].children].map(li => {
          const type = "collection";
          let childNodes = li.childNodes;
          let subTitle = childNodes[0].textContent;
          let title = childNodes[1].textContent.trim();
          let divideType =
            childNodes[2]?.textContent === "획득" ? "get" : "noGet";
          if (index === 4) {
            // 모코코
            const get = childNodes[3].childNodes[1].textContent;
            const total = childNodes[3].childNodes[3].textContent;
            const area = childNodes[2].textContent.trim();
            subTitle = childNodes[1].textContent;
            divideType = get === total ? "get" : "noGet";
            title = `${area} ${get} / ${total}`;
          }
          return {
            type,
            divideType,
            detail: { subTitle: [`#${subTitle}`], title, grade: divideType },
          };
        });

        this.collectionDetail.push(detail);
      }
    );
  }
}
