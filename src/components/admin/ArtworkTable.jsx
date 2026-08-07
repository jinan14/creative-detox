import { FiEdit2, FiTrash2, FiCheckCircle, FiXCircle, FiChevronUp, FiChevronDown } from "react-icons/fi";
import resolveImageUrl from "../../utils/resolveImageUrl";

export default function ArtworkTable({ artworks, onEdit, onDelete, onToggleAvailable, onMove }) {
  if (artworks.length === 0) {
    return (
      <p className="text-center text-neutral-500 font-body py-10">
        No artworks yet — add your first piece above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">Artwork</th>
            <th className="pb-3 pr-4">Artist</th>
            <th className="pb-3 pr-4">Category</th>
            <th className="pb-3 pr-4">Price</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {artworks.map((artwork, index) => (
            <tr key={artwork._id} className="font-body text-sm text-neutral-700">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col flex-shrink-0">
                    <button
                      onClick={() => onMove(index, "up")}
                      disabled={index === 0}
                      className="text-neutral-400 hover:text-teal transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiChevronUp size={15} />
                    </button>
                    <button
                      onClick={() => onMove(index, "down")}
                      disabled={index === artworks.length - 1}
                      className="text-neutral-400 hover:text-teal transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiChevronDown size={15} />
                    </button>
                  </div>
                  <img
                    src={resolveImageUrl(artwork.image)}
                    alt={artwork.title}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <span className="font-medium text-neutral-900 line-clamp-1">{artwork.title}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-neutral-500">{artwork.artist}</td>
              <td className="py-3 pr-4 text-neutral-500">{artwork.category}</td>
              <td className="py-3 pr-4 font-semibold text-teal">${artwork.price}</td>
              <td className="py-3 pr-4">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    artwork.available ? "bg-sage/10 text-sage-dark" : "bg-berry/10 text-berry"
                  }`}
                >
                  {artwork.available ? "Available" : "Sold"}
                </span>
              </td>
              <td className="py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onToggleAvailable(artwork)}
                    className="p-2 text-neutral-400 hover:text-teal transition-colors"
                    title={artwork.available ? "Mark as sold" : "Mark as available"}
                  >
                    {artwork.available ? <FiXCircle size={16} /> : <FiCheckCircle size={16} />}
                  </button>
                  <button
                    onClick={() => onEdit(artwork)}
                    className="p-2 text-neutral-400 hover:text-teal transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(artwork)}
                    className="p-2 text-neutral-400 hover:text-berry transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
