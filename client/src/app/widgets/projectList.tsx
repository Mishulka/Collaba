export function ProjectsList() {
    const projects = [
        { id: 1, name: "Test project 1", type: "Markdown" },
        { id: 2, name: "Test project 2", type: "Board" },
        { id: 3, name: "Test project 3", type: "Markdown" },
    ];

    const getTypeIcon = (type: string) => {
        return type === 'Markdown' ? '📃' : '📒';
    };

    const getTypeLabel = (type: string) => {
        return type === 'Markdown' ? 'Markdown' : 'Board';
    };

    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Недавние</h2>
            <div>
                {projects.map((project) => (
                    <a
                    key="{project.id}"
                    href={`/projects/${project.id}`}
                    className="block p-4 mb-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <div className="text-lg font-medium">
                            {getTypeIcon(project.type)}
                        </div>
                        <div className="font-medium">{project.name}</div>
                    </a>
                ))}
            </div>
        </div>
    )
}