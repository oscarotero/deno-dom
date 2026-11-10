import { DOMParser, Element } from "../../mod.ts";
import { describe, it, expect } from "vitest";

describe("getElementsBy", () => {
  it("Element.getElementsByTagName", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <aside>
            <img>
            <article class=an-article>
              <p class=this-p>Foo bar baz</p>
            </article>
          </aside>
        </div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector("div")!;
    const aside = divMain.getElementsByTagName("aside")[0];
    const article = divMain.getElementsByTagName("article")[0];

    expect(aside).toBeTruthy();
    expect(article).toBeTruthy();

    const img = article.previousElementSibling!;
    const mainP = divMain.getElementsByTagName("p")[0];
    const articleP = article.getElementsByTagName("P")[0];
    const articlePClass = article.getElementsByClassName("this-p")[0];

    expect(img).toBeTruthy();
    expect(mainP).toBeTruthy();
    expect(articleP).toBeTruthy();

    const imgParentArticle = (img!.parentElement! as Element).getElementsByTagName("article")[0];

    expect(aside.tagName).toBe("ASIDE");
    expect(article.tagName).toBe("ARTICLE");
    expect(img.tagName).toBe("IMG");
    expect(mainP.tagName).toBe("P");
    expect(articleP.tagName).toBe("P");
    expect(articleP).toBe(articlePClass);
    expect(mainP.parentNode).toBe(article);
    expect(imgParentArticle).toBe(article);
  });

  it("Element.getElementsByClassName", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <aside class=an-aside>
            <img>
            <article class=an-article>
              <p class=this-p>Foo bar baz</p>
            </article>
            <p class="a b c">working</p>
          </aside>
        </div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const aside = divMain.getElementsByClassName("an-aside")[0];
    const article = divMain.getElementsByClassName("an-article")[0];

    expect(aside).toBeTruthy();
    expect(article).toBeTruthy();

    const img = article.previousElementSibling!;
    const mainP = divMain.getElementsByClassName("this-p")[0];
    const articleP = article.getElementsByClassName("this-p")[0];

    expect(img).toBeTruthy();
    expect(mainP).toBeTruthy();
    expect(articleP).toBeTruthy();

    const imgParentArticle = (img!.parentElement! as Element).getElementsByClassName(
      "an-article",
    )[0];

    expect(aside.tagName).toBe("ASIDE");
    expect(article.tagName).toBe("ARTICLE");
    expect(img.tagName).toBe("IMG");
    expect(mainP.tagName).toBe("P");
    expect(articleP.tagName).toBe("P");
    expect(mainP).toBe(articleP);
    expect(mainP.parentNode).toBe(article);
    expect(imgParentArticle).toBe(article);
    expect(doc.getElementsByClassName("a c").length).toBe(1);
    expect(doc.getElementsByClassName("  a   b   ").length).toBe(1);
    expect(doc.getElementsByClassName("  a  dd b   ").length).toBe(0);
    expect(doc.getElementsByClassName("  a  c b   ").length).toBe(1);
    expect(doc.getElementsByClassName("c").length).toBe(1);
    expect(doc.getElementsByClassName("v").length).toBe(0);
    expect(doc.getElementsByClassName("a a b c b").length).toBe(1);
  });

  it("Element.getElementById", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=main>
          <aside id=an-aside>
            <img>
            <article id=an-article>
              <p id=this-p>Foo bar baz</p>
            </article>
          </aside>
        </div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector("#main")!;
    const aside = divMain.getElementById("an-aside")!;
    const article = divMain.getElementById("an-article")!;

    expect(aside).toBeTruthy();
    expect(article).toBeTruthy();

    const img = article.previousElementSibling!;
    const mainP = divMain.getElementById("this-p")!;
    const articleP = article.getElementById("this-p")!;
    const articlePClass = article.getElementById("this-p")!;

    expect(img).toBeTruthy();
    expect(mainP).toBeTruthy();
    expect(articleP).toBeTruthy();

    const imgParentArticle = (img!.parentElement! as Element).getElementById("an-article");

    expect(aside.tagName).toBe("ASIDE");
    expect(article.tagName).toBe("ARTICLE");
    expect(img.tagName).toBe("IMG");
    expect(mainP.tagName).toBe("P");
    expect(articleP.tagName).toBe("P");
    expect(articleP).toBe(articlePClass);
    expect(mainP.parentNode).toBe(article);
    expect(imgParentArticle).toBe(article);
  });
});
