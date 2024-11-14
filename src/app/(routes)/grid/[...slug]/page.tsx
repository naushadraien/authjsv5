"use client";
import { useEffect } from "react";
import "./style.css";
export default function GridPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  console.log("slug", slug);

  const handleBtnClick = () => {
    const sidebarDiv = document.getElementById("sidebar");
    sidebarDiv?.classList.toggle("show");
  };

  return (
    <div className="grid">
      <nav>
        <button onClick={handleBtnClick} className="bg-white text-black">
          Button
        </button>{" "}
        Navbar
      </nav>
      <aside id="sidebar">Sidebar</aside>
      <main>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga dolorum
          iusto, obcaecati, repellat sunt porro asperiores debitis voluptates
          nulla ex placeat dignissimos esse ipsum enim officia optio voluptatum
          aperiam laudantium culpa? Aliquid totam culpa distinctio recusandae
          sequi perferendis enim! Facilis, deserunt molestias. Perspiciatis eius
          error enim. Voluptate corrupti ipsum veritatis similique, quam
          dolores? Perspiciatis dolor consequuntur aspernatur recusandae
          architecto ipsam, praesentium quo illum aperiam nostrum ipsum cumque
          laudantium consequatur omnis earum explicabo iusto, ab labore non nemo
          impedit ut tenetur dolore. Saepe culpa dolore velit, cum ipsum,
          reprehenderit dolorem eveniet aliquid, quod necessitatibus nobis.
          Libero fugit nostrum enim animi explicabo a, corrupti laborum veniam
          nisi totam. Exercitationem iure vero nihil perferendis dolorum,
          reprehenderit non quas, officiis beatae necessitatibus aliquam atque
          odit repudiandae, quo magnam distinctio esse delectus. Quas modi illo,
          cum nesciunt aperiam harum adipisci. Eveniet placeat fuga aperiam
          quaerat nobis quam reiciendis consequuntur quidem possimus rerum
          laudantium minima dolor nisi dicta, facere, quos odio temporibus
          suscipit dolorum hic vel. Quam fugiat doloremque voluptatibus
          perferendis asperiores illum, molestias qui a, repellat itaque modi
          quis velit illo accusantium veritatis cupiditate error aliquam eius
          porro consequuntur excepturi, ipsa inventore rem. Et voluptatibus ab
          laboriosam provident ipsa. Facilis laboriosam corporis, doloribus et
          ab quas consequuntur cumque iure fugit aut accusantium quasi error
          sint. Ipsa laudantium, odit nisi porro quasi quam officiis error
          repudiandae laboriosam ducimus tempore veniam obcaecati deleniti
          maiores vitae vel corporis placeat exercitationem cumque repellendus
          natus omnis reprehenderit adipisci! Aperiam deleniti sint facere
          labore corrupti harum quibusdam, recusandae vitae est accusantium nam
          dolores laborum explicabo quasi ipsam! Explicabo obcaecati doloribus
          porro delectus, aspernatur necessitatibus nesciunt, sed modi eum fugit
          iure eos. Repudiandae est consequuntur error iure ullam, eligendi eius
          sint molestiae eveniet dolores esse? Provident, tempore! Magni
          recusandae ducimus, commodi asperiores voluptas minima. Officia, vel
          sed earum inventore doloremque optio perferendis?
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo?
          Quibusdam fuga dolor, voluptates eos ipsum incidunt non odio facilis.
          Voluptatum adipisci optio magni corporis similique quasi accusantium
          ut tempore, fugit, praesentium iusto possimus aperiam officia sed ex
          tenetur. Quae ipsum eveniet optio, laudantium asperiores dolor sequi
          provident quasi, sapiente distinctio explicabo eos deserunt quia illo
          omnis architecto pariatur officiis numquam magni enim hic odit
          aliquam? Alias quidem, inventore non deleniti perferendis accusantium
          error in, delectus minima ratione doloremque excepturi, culpa nobis
          asperiores. Dignissimos ullam laudantium soluta perspiciatis nostrum,
          nam doloremque! Animi consectetur eius magni quae pariatur omnis
          repellat quia, fugiat nesciunt quibusdam explicabo. Ullam ducimus
          tenetur cum nisi nemo natus eum quo vero? Nisi soluta neque vel, natus
          ea impedit quam deserunt aliquid assumenda error maiores explicabo
          perspiciatis repudiandae ut distinctio molestias, ab, voluptates
          debitis amet provident. Laboriosam cumque, molestiae maxime animi
          nobis aut. Perspiciatis corporis delectus excepturi omnis placeat
          quaerat sint quis culpa fugiat inventore quisquam odit repudiandae est
          sed, laboriosam non corrupti quo ipsum? Ex aut sunt, sapiente illo
          fugiat aliquam aliquid eum ut delectus tempore eius quis assumenda,
          deserunt voluptatum nobis inventore quidem, in rem incidunt. Tenetur
          similique soluta officia reprehenderit numquam facilis dicta corrupti
          voluptas. Ut possimus maiores repellat sed voluptatem pariatur harum
          sit eligendi, natus provident autem minima aliquid iste quasi ea vel
          voluptas dicta ratione dolorum ipsum veniam beatae commodi vitae!
          Omnis repudiandae debitis facere nobis accusamus sit voluptas officia
          placeat praesentium vero, minus, provident perspiciatis, laborum nam
          libero corporis alias odio repellendus earum. Quibusdam, eos tempora.
          Pariatur repudiandae quibusdam fugiat saepe aliquam, nobis ullam
          dolorum, mollitia ea quod labore. Esse iste earum porro minima
          recusandae facere deserunt sint commodi dolorum veniam, vero tenetur
          dolorem quibusdam neque quia quidem modi nesciunt laborum veritatis?
          Cumque, quaerat. Minima voluptate, quam error aspernatur ea sequi,
          nobis dolore veniam vitae laboriosam repudiandae omnis assumenda
          accusamus similique dignissimos repellendus corporis recusandae
          possimus doloremque fugit molestiae dicta expedita laudantium quasi?
          Voluptatum necessitatibus sunt totam quibusdam laudantium nostrum
          fugit ducimus, inventore ea obcaecati voluptatem deleniti doloribus
          at, quia aut et optio numquam ipsum, magnam fugiat vel! Exercitationem
          amet quaerat doloribus numquam tempore sunt impedit, non aperiam sed
          dolor assumenda a perferendis quasi! Tempore omnis impedit, dolore
          doloremque quas eligendi veritatis obcaecati vero adipisci commodi
          unde necessitatibus amet accusantium illo iusto maiores repellat iste
          at sunt distinctio labore fugiat debitis. Sint quia at voluptatum
          dolores deserunt possimus delectus officia facilis a? Eaque quisquam
          quod non voluptate, dolore dolorum, libero neque molestias dolorem ad
          ipsa voluptates cum laborum animi corporis rerum consequuntur eos
          aspernatur delectus dolores distinctio asperiores obcaecati voluptas
          blanditiis. Consectetur architecto, quaerat explicabo dicta incidunt
          itaque mollitia magni libero maiores perspiciatis. Et impedit
          doloremque harum excepturi quia architecto obcaecati, culpa suscipit
          consequatur provident odit fuga enim molestiae quas inventore delectus
          in ratione perspiciatis rem. Cum ea, illum minima corporis repudiandae
          facilis consequuntur nisi! Quo itaque, inventore molestiae quod
          provident ullam beatae ipsam animi perferendis sit libero, nihil ea
          architecto nesciunt, fuga ipsa. Adipisci quidem incidunt modi odit
          quia sit perspiciatis.
        </p>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
