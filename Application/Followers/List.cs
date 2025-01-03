using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Application.Interfaces;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profiles.Profile>();

                switch(request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings
                            .Where(c => c.Target.UserName == request.Username)
                            .Select(c => c.Observer).ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() }).ToListAsync();
                        break;
                    case "following":
                        profiles = await _context.UserFollowings
                            .Where(c => c.Observer.UserName == request.Username)
                            .Select(c => c.Target).ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() }).ToListAsync();
                        break;
                }

                return Result<List<Profiles.Profile>>.Success(profiles);
            }
        }
    }
}