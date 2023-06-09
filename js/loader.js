
function loadConfig(config) {
    const op =  new Map()
    op.set("title", loadText)
    op.set("subtitle", loadText)
    op.set("icondir", loadIcon)
    op.set("profiledir", loadProfile)
    op.set("languages", loadOptions)
    op.set("projects", loadProjects)

    for (const [key, value] of Object.entries(config)) {
        if (op.has(key)) {
            op.get(key)(key, value)
        }
    }
}

function loadIcon(key, dir) {
    $("#"+key).attr("href", dir)
}

function loadProfile(key, dir) {
    $("#"+key).attr("src", dir)
}

function loadText(key, s) {
    $("#"+key).text(s)
}

function loadOptions(key, slist) {
    let options = $("#" + key)
    for (s of slist) {
        const option = $('<option>', {
            value: s,
            text: s
        });
        options.append(option)
    }
}

//  NOTE: to retrieve category and languages of a project we can:
//  const category = $(this).data('category');
//  const languages = $(this).data('languages').split(',');
function loadProjects(key, prjs) {
    let projects = $("#" + key)
    prjs.forEach(p => {
        const pd = `
            <div class="col-md-4 card mb-3 bg-light border-bg-light hover-effect" data-languages="${p.languages.join(',')}">
                <a href="${p.url}" target="_blank">
                    <div>
                        <img class="rounded-image" width=100% src="${p.imgdir}" style="height: 150px; object-fit: cover;">
                    </div>
                    <div>
                        <b>${p.title}</b>
                        <p>${"<u>Technologies:</u> " + p.technologies.join(', ') + "."}</p>
                    </div>
                    
                </a>
            </div>
        `
        projects.append(pd);
    })
}