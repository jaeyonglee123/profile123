document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("guestbook-form");
  const guestbookEntries = document.getElementById("guestbook-entries");

  async function fetchEntries() {
    try {
      const response = await axios.get("http://35.173.37.0:8000/guestbook");
      const entries = response.data.entries;
      console.log(entries);

      guestbookEntries.innerHTML = "";

      if (Array.isArray(entries)) {
        entries.forEach((entry) => {
          const entryElement = document.createElement("li");
          entryElement.classList.add("entry");
          entryElement.innerHTML = `
                <header>
                    <strong>${entry.name}</strong>
                    <time>${new Date(entry.timestamp).toLocaleString()}</time>
                </header>
                <p>${entry.message}</p>
                <button data-id="${entry.id}">Delete</button>
            `;
          guestbookEntries.appendChild(entryElement);
        });
      } else {
        console.error("Fetched data is not an array:", entries);
      }
    } catch (error) {
      console.error("There was an error fetching entries!", error);
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("author").value;
    const message = document.getElementById("content").value;

    try {
      const response = await axios.post("http://35.173.37.0:8000/guestbook", {
        name,
        message,
      });

      if (response.status === 200) {
        fetchEntries();
        form.reset();
      }
    } catch (error) {
      console.error("There was an error submitting the entry!", error);
    }
  });

  guestbookEntries.addEventListener("click", async function (e) {
    if (e.target.tagName === "BUTTON") {
      const entryId = e.target.getAttribute("data-id");
      try {
        const response = await axios.delete(
          `http://35.173.37.0:8000/guestbook/${entryId}`
        );

        if (response.status === 200) {
          fetchEntries();
        }
      } catch (error) {
        console.error("There was an error deleting the entry!", error);
      }
    }
  });

  fetchEntries();
});
