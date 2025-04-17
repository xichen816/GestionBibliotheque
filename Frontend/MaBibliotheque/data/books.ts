import type { Book } from "./../types/types"

export const books: Book[] = [
    {
        id: 1,
        title: "L'Étranger",
        author: "Albert Camus",
        description:
            "L'Étranger est un roman d'Albert Camus, paru en 1942. Il prend place dans la tétralogie que Camus nommera « cycle de l'absurde » qui décrit les fondements de la philosophie camusienne : l'absurde.",
        available: true,
        isbn: "978-2070360024",
        publishedYear: 1942,
        category: "Roman",
    },
    {
        id: 2,
        title: "Les Misérables",
        author: "Victor Hugo",
        description:
            "Les Misérables est un roman de Victor Hugo paru en 1862. Il a donné lieu à de nombreuses adaptations, au cinéma et sur de nombreux autres supports.",
        available: false,
        isbn: "978-2253096344",
        publishedYear: 1862,
        category: "Roman historique",
    },
    {
        id: 3,
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        description:
            "Le Petit Prince est une œuvre de langue française, la plus connue d'Antoine de Saint-Exupéry. Publié en 1943 à New York simultanément en anglais et en français.",
        available: true,
        isbn: "978-2070612758",
        publishedYear: 1943,
        category: "Conte philosophique",
    },
    {
        id: 4,
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        description:
            "Madame Bovary est un roman de Gustave Flaubert paru en 1857. Il s'agit d'une œuvre majeure de la littérature française.",
        available: true,
        isbn: "978-2253004868",
        publishedYear: 1857,
        category: "Roman",
    },
    {
        id: 5,
        title: "Les Fleurs du Mal",
        author: "Charles Baudelaire",
        description:
            "Les Fleurs du mal est un recueil de poèmes de Charles Baudelaire, englobant la quasi-totalité de sa production en vers, de 1840 jusqu'à sa mort survenue fin août 1867.",
        available: false,
        isbn: "978-2253158677",
        publishedYear: 1857,
        category: "Poésie",
    },
    {
        id: 6,
        title: "Candide",
        author: "Voltaire",
        description:
            "Candide ou l'Optimisme est un conte philosophique de Voltaire paru à Genève en janvier 1759. Il a été réédité vingt fois du vivant de l'auteur.",
        available: true,
        isbn: "978-2081358133",
        publishedYear: 1759,
        category: "Conte philosophique",
    },
]
